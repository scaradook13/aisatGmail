require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.ADMINSECRET, { expiresIn: "5h" });

const verifyToken = (token) => jwt.verify(token, process.env.ADMINSECRET);

module.exports = { generateToken, verifyToken };
