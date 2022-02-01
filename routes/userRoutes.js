const express = require("express");
const User = require("./../models/user");
const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json("User added successfully!");
  } catch (error) {
    res.status(401).json(error);
  }
});
router.post("/delete", async (req, res) => {
  try {
    const { _id } = req.body;
    await User.findOneAndDelete({ _id });
    res.status(200).json("User deleted successfully!");
  } catch (error) {
    res.status(401).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = router;
