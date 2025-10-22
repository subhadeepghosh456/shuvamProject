const express = require("express");
const connectDB = require("./DB");
const userRoute = require("./route/user.route");
require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api/v1/user", userRoute);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is runing on port", port);
  });
});
