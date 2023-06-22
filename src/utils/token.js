// Load environment variables
require("dotenv").config();

const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const ONE_MINUTE_IN_MS = 60 * 1000;

 const signToken = (user) => {
  const payload = {
    sub: user.id,
    name: user.fullname,
    exp: Date.now() + ONE_MINUTE_IN_MS,
  };

  return jwt.sign(payload, SECRET);
};

 const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

 const validateExpiration = (payload) => {
  if (Date.now() > payload.exp) {
    throw new Error("Token expirado");
  }
};


module.exports = { signToken, verifyToken, validateExpiration };