const express = require("express");
const authRoutes = require("./routes/auth.Routes.js");
const restaurantRoutes = require("./routes/restaurant.routes.js");
const orderRoutes = require("./routes/order.Routes.js");
const paymentRoutes = require("./routes/payment.Routes.js");
const menuRoutes = require("./routes/menu.Routes.js");
const cors = require("cors");
const  rateLimit = require('express-rate-limit')
const app = express();

require('dotenv').config();
require("./config/db.js")

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.get("/",(req,res)=>{
res.send("Hello")
})

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/menuItems",menuRoutes);

// global error handling
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        success: false,
        message: err.message || "Server Error"
    })
})


const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`)
})