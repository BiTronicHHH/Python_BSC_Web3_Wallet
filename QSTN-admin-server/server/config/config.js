// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 5000;

// ============================
//  Enviroment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  Token expiration
// ============================
// 60 sec * 60 min * 24 hours * 30 days
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// ============================
//  Authentication seed
// ============================
process.env.SEED = process.env.SEED || "dev-secret-seed";

// ============================
//  Data base
// ============================
process.env.URLDB =
  // "mongodb+srv://Takus:jdk201016@cluster0.ghvicx9.mongodb.net/?retryWrites=true&w=majority";
  "mongodb://localhost:27017/qstn_admin";
