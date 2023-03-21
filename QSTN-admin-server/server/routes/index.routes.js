const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");
const WhiteListedUser = require("../models/WhitelistedUser.model");
const Business = require("../models/Business.model");
const app = express();
const multer = require('multer');
const { verificateToken } = require("../middleware/authentication.middleware");

//setup multer for file upload
var storage = multer.diskStorage(
  {
    destination: './build',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }
);

const upload = multer({ storage: storage })

// ============================
// Login (returns user instance, auth token)
// ============================
app.get("/", (req, res) => {
  return res.send("Server1 works well");
});

// ============================
// Login (returns user instance, auth token)
// ============================

app.post("/login", (req, res) => {
  let body = req.body;
  console.log("here", body)
  Admin.findOne({ username: body.username }, (err, admin) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!admin) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "You are not an admin!",
        },
      });
    }

    // We will see if the body.password in the request is the same as the userDB
    // if (!bcrypt.compareSync(body.password, admin.password)) {
    if (body.password == admin.password) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "User password is wrong",
        },
      });
    }

    let token = jwt.sign(
      {
        admin: admin,
      },
      process.env.SEED,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    res.json({
      ok: true,
      admin: admin,
      token,
    });
  });
});


// ============================
// Create New User: All users will use this api to register
// ============================
app.post("/register", function (req, res) {
  let body = req.body;

  //   first verify if user already exists or not
  Admin.findOne({ username: body.name }, (err, foundUserDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (foundUserDB) {
      console.log('ok');
      return res.status(400).json({
        ok: false,
        err: {
          message: "Admin already exists in db",
        },
      });
    }

    // Here we create a new user with the params given in the request body
    let newAdmin = new Admin({
      username: body.username,
      password: bcrypt.hashSync(body.password, 10),
    });
    // Now we save it in to the bbdd
    newAdmin.save((err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        user: userDB,
      });
    });
  });
});

// ============================
// Get current user (returns user instance)
// ============================
app.get("/current", verificateToken, (req, res) => {
  res.json({
    ok: true,
    admin: req.user,
  });
});
// ============================
// Register new user in whitelist
// ============================
app.post("/business/create", upload.single('image'), (req, res, next) => {
  let body = req.body;
  console.log(req);
  //   first verify if user already exists or not
  Business.findOne({ email: body.email }, (err, foundAddrDB) => {
    if (err) {
      console.log(" > 2")
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (foundAddrDB) {
      console.log(" > 3")
      return res.status(400).json({
        ok: false,
        err: {
          message: "Business already exists in db",
        },
      });
    }
    console.log(" > 4")
    // Here we create a new user with the params given in the request body
    let business = new Business({
      email: body.email,
      display_name: body.display_name,
      bio: body.bio,
    });
    console.log(" > 5")
    // Now we save it in to the bbdd
    business.save((err, userDB) => {
      if (err) {
        console.log(" > 6")
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Business.find({}, (err, data) => {
        res.json({
          ok: true,
          business: data,
        });
      });
    });
  });
});

app.post("/business/display", (req, res) => {

  let body = req.body;
  console.log("business/display")
  //   first verify if user already exists or not
  Business.findOne({ email: body.email }, (err, foundAddrDB) => {
    Business.find({}, (err, data) => {
      res.json({
        ok: true,
        business: data,
      });
    });
  });
});

// ============================
// Update user in whitelist
// ============================
app.post("/whitelist/update", verificateToken, (req, res) => {
  let body = req.body;

  WhiteListedUser.findByIdAndUpdate(
    body.id,
    {
      address: body.password,
      status: body.status,
    },
    (err, whitelistDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        okay: true,
      });
    }
  );
});

// ============================
// Get all whitelist data
// ============================
app.get("/whitelist/get_all", verificateToken, (req, res) => {
  WhiteListedUser.find({}, (err, whitelistDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      whitelistDB,
    });
  });
});

// ============================
// Remove whitelist data by ID
// ============================
app.post("/whitelist/remove", verificateToken, (req, res) => {
  WhiteListedUser.findByIdAndRemove(req.body.id, (err, data) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err: {
          message: "Removing was failure.",
        },
      });
      return;
    }
    WhiteListedUser.find({}, (err, whitelistDB) => {
      res.json({
        ok: true,
        user: whitelistDB,
      });
    });
  });
});

// ============================
// Change Status by ID
// ============================
app.post("/whitelist/change", verificateToken, (req, res) => {
  WhiteListedUser.findByIdAndUpdate(
    { _id: req.body.id },
    { status: req.body.status },
    (err, whitelist) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err: {
            message: "Updating was failure",
          },
        });
        return;
      }
      WhiteListedUser.find({}, (err, whitelist) => {
        if (!err) {
          res.status(200).json({
            ok: true,
            whitelist: whitelist,
          });
        }
      });
    }
  );
});

module.exports = app;
