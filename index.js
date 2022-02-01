const express = require("express");
const cors = require("cors");
require("./db/conn");
var cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const val = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  sameSite: "none",
};
app.get("/", (req, res) => {
  res.json("Backend Started!");
});
app.use(cookieParser());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log("Server started successfully");
});
