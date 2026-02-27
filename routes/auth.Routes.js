const express=require("express")
const authRoutes=express.Router();
const authController=require("../controllers/auth.controllers.js")

authRoutes.post("/register",authController.register);
authRoutes.post("/login",authController.Login);

module.exports=authRoutes