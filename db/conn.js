const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.CONNECTION_URL;
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
