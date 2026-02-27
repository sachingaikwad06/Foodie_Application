// handles business logic for placing order

const menuItemModels = require("../models/menuItemModels");
const orderModels = require("../models/orderModels");

const restaurantModels = require("../models/restaurantModels");
const { allowTransaction } = require("../utils/orderStatusFlow");

//controller only called this function and send response
const createOrder = async (userId, data) => {
    // fetch restaurantId and items from req.body - services not directly depends on req object
    const {restaurantId, items} = data;
    const restaurant = await restaurantModels.findById(restaurantId);
    // validate resto exist or not
    if(!restaurant) throw new Error("Resturant not found");
    if(!restaurant.isOpen) throw new Error("Restaurant is closed");

    let totalAmount = 0;

    const orderItems = [];

    for (let item of items) {
    const MenuItem = await menuItemModels.findById(item.menuItemId);

    if (!MenuItem || !MenuItem.isAvailable) {
        throw new Error("Unavailable menu item. Please choose another one");
    }

    const itemTotal = MenuItem.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
        menuItemId: MenuItem._id,   // ✅ FIXED
        quantity: item.quantity,
        priceAtOrderTime: MenuItem.price
    });
}
// order status will be by default placed
    const order = await orderModels.create({
        userId,
        restaurantId,
        items:orderItems,
        totalAmount
    })
// return to order controller
    return order
}

//update Order status - but ensures that changes only done by through admin
// restaurant admin handle all of those things

const updateStatus = async (orderId, newStatus, adminId) => {
    const order = await orderModels.findById(orderId).populate("restaurantId");
    if(!order){
        //order must be exist for update
        throw new Error("Order not found");
    }
    // authorize - check ownership (only admin can update own resturant orders)
    if(order.restaurantId.ownerID.toString() !== adminId){ // adminId will be come in string and mongodb
        throw new Error("you not allowed to update this order");
    }

    //get current order status
    const currentStatus = order.status;

    //validate status 
    const nextStatus = allowTransaction[currentStatus]

    if(!nextStatus.includes(newStatus)){
        throw new Error(`Invalid status updation ${currentStatus} to ${newStatus}`);
    }
    order.status = newStatus; // updation done
    await order.save(); //savemethod words like create in mongodb

    // return updated order status
    return order;
}

module.exports = {createOrder, updateStatus}
