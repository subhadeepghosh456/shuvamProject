const express = require('express');
const route = express.Router();
const {createOrder, getUserOrders, changeStatus} = require('../contoller/order.controller');
const { userAuth } = require("./../middleware/auth");

route.post('/create', userAuth, createOrder);
route.get('/list', userAuth, getUserOrders);
route.patch('/change-status/:id', userAuth, changeStatus);

module.exports = route;