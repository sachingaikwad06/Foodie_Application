const express = require("express");
const paymentRoutes = express.Router();
const { initialPayment, verifyPayment } = require("../controllers/payment.controllers.js");
const authMiddleware = require("../middleware/auth.middleware.js");

paymentRoutes.post("/initiate",authMiddleware ,initialPayment);
paymentRoutes.post("/verify", authMiddleware, verifyPayment);

module.exports = paymentRoutes;