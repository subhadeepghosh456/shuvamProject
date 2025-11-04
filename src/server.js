const express = require("express");
const cors = require("cors");
const connectDB = require("../DB");  // Changed from "./DB"
const cookieParser = require('cookie-parser');                                  
const userRoute = require("../route/user.route");  // Changed from "./route/user.route"
const orderRoute = require("../route/order.route");  // Changed from "./route/order.route"

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
  process.exit(1);
});