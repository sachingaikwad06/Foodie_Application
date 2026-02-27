// real gateways- Razorpay/ Stripe 
const orderModels = require("../models/orderModels");
const paymentModels = require("../models/paymentModels");

//fake transcation id
const generateTranscationId = () => {
    return "TXN_" + Date.now();
};

// initial payment- works like real payment gateways

const initialPayment = async (orderId, method) => {
    // fetch order from database
    const order = await orderModels.findById(orderId)
    if(!order) {
        throw new Error("Order not found")
    }
    if(order.paymentStatus==="PAID"){
        throw new Error("Payment already completed for this order")
    }
    const payment= await paymentModels.create({
        orderId:order._id,// changed (updated)
        amount:order.totalAmount,
        method,
        status:"PENDING",
        transactionId:generateTranscationId(),
    })

    return payment

}

const verifyPayment=async(orderId,success)=>{
const payment=await paymentModels.findOne({orderId});

if(!payment) {
    throw new Error("Payment record is not found");
}

const order=await orderModels.findById(orderId);

if(!order) {
    throw new Error("order not found");
}

if(success){
    payment.status="PAID",
    order.paymentStatus="PAID"
}else{
    payment.status="FAILED",
    order.paymentStatus="FAILED"
}

await payment.save();
await order.save()

return{
    payment,
    order
}
}
module.exports={initialPayment,verifyPayment}