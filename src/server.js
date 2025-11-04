const express = require("express");
const cors = require("cors");
const connectDB = require("./DB");
const cookieParser = require('cookie-parser');                                  
const userRoute = require("./route/user.route");
const orderRoute = require("./route/order.route");


require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: "*", // Or specify: ['http://localhost:3000', 'https://yourdomain.com']
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server is runing on port", port);
  });
});
