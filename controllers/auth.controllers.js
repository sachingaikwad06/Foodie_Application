const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const usermodels = require("../models/usermodels.js");


const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await usermodels.create({
            name,
            email,
            password: hashPassword,
            role
        });
        res.status(201).json({ message: "User Registered" }) // created successfully.
    } catch (error) {
        next(error)
    }
}

const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await usermodels.findOne({ email });
        if (!user) throw new Error("Invalid creditinals")

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid creditinals");

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.json({
            token,
            role:user.role
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { register, Login }