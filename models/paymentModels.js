const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    method:{
        type: String,
        enum: ["CARD", "UPI", "COD"],
        required: true
    },
    status:{
        type: String,
        enum: ["PAID", "PENDING", "FAILED"],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Payment", paymentSchema)