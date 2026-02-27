const express = require("express");
const { createRestaurant, getRestaurants } = require("../controllers/restaurant.controllers");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const restaurantRoutes = express.Router();

restaurantRoutes.post("/",authMiddleware, roleMiddleware("ADMIN") ,createRestaurant);
restaurantRoutes.get("/", getRestaurants);

module.exports = restaurantRoutes;