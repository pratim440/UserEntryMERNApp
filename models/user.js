const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
