const express = require("express");
const connectDB = require("./DB");
require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(express.json());

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is runing on port", port);
  });
});
