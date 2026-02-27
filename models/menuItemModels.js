const mongoose = require("mongoose")

const menuSchema = mongoose.Schema({
    name:{
        type: String,
        requied: true
    },
    price:{
        type: Number,
        required: true
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("MenuItem", menuSchema)