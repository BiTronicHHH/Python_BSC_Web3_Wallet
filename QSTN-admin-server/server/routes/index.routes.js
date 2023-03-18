const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin.model");
const WhiteListedUser = require("../models/WhitelistedUser.model");

const app = express();

const { verificateToken } = require("../middleware/authentication.middleware");

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
app.post("/whitelist/create", verificateToken, (req, res) => {
  let body = req.body;
  //   first verify if user already exists or not
  WhiteListedUser.findOne({ address: body.address }, (err, foundAddrDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (foundAddrDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "User already exists in db",
        },
      });
    }

    // Here we create a new user with the params given in the request body
    let user = new WhiteListedUser({
      address: body.address,
      status: body.status,
    });
    // Now we save it in to the bbdd
    user.save((err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      WhiteListedUser.find({}, (err, whitelistDB) => {
        res.json({
          ok: true,
          user: whitelistDB,
        });
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
