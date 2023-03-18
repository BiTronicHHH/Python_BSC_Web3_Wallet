const jwt = require("jsonwebtoken");

// ===============================
//  Token verification
// ===============================

let verificateToken = (req, res, next) => {
  // next to continue program execution

  let token = req.get("Authorization");

  console.log(token);

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        err: {
          message: "Token not valid",
        },
        type: "token_invalid",
      });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = {
  verificateToken,
};
