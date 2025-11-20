const express = require("express");
const route = express.Router();
const {
  createOrder,
  getUserOrders,
  changeStatus,
} = require("../contoller/order.controller");
const { userAuth } = require("./../middleware/auth");
const { upload } = require("../middleware/multer.middleware");

route.post(
  "/create",
  userAuth,
  upload.fields([
    {
      name: "image", maxCount: 1
    },
    
  ]),
  createOrder
);
route.get("/list", userAuth, getUserOrders);
route.patch("/change-status/:id", userAuth, changeStatus);

module.exports = route;
