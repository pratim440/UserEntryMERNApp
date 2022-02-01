const express = require("express");
const Admin = require("./../models/admin");
const bcrypt = require("bcrypt");
const { createToken, validateToken } = require("./../config/JWT");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Admin.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json(err);
  }
});

router.post("/newAdmin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const addAdmin = new Admin({ email, password });
    await addAdmin.save();
    res.status(200).json("added");
  } catch (err) {
    res.status(401).json("failed");
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminData = await Admin.findOne({ email });
    bcrypt.compare(password, adminData.password).then((match) => {
      if (!match) res.status(401).json("Wrong Password!");
      else {
        const accessToken = createToken(req.body);
        res.cookie("accessToken", accessToken, {
          maxAge: 300000,
          httpOnly: true,
        });
        res.status(200).json("Logged in successfully!");
      }
    });
  } catch (err) {
    res.status(400).send("Email does not exist!");
  }
});
router.get("/checkAdmin", validateToken, (req, res) => {
  res.status(200).json("User Authenticated");
});

module.exports = router;
