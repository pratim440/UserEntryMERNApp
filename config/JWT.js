const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createToken = ({ email, password }) => {
  const token = sign({ email, password }, process.env.JWT_SECRET);
  return token;
};

const validateToken = (req, res, next) => {
  // const accessToken = req.cookies["accessToken"];
  const { accessToken } = req.body;
  console.log(accessToken);
  if (!accessToken) return res.status(400).json("User not Authenticated!");
  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createToken, validateToken };
