const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true})

module.exports = mongoose.model("User", userSchema);