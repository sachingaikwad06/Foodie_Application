const menuItemModels = require("../models/menuItemModels");
const restaurantModels = require("../models/restaurantModels");

const createMenuItem = async (req, res, next) => {
    try {
        const {name, price, restaurantId} = req.body
        const restuarant = await restaurantModels.findById(restaurantId);
        if(!restuarant) {
            throw new Error("Restaurant is not found")
        }
        if(restuarant.ownerID.toString() !== req.user.id){
            throw new Error("Not authorized to add menu items")
        }
        const menuItem = await menuItemModels.create({
            name,
            price, restaurantId
        })
        res.status(201).json({
            success: true,
            data: menuItem
        })
    } catch (error) {
        next(error)
    }
}


const getMenuItem = async (req, res, next) => {
    try {
        const {restaurantId} = req.params
        
    
        const menuItem = await menuItemModels.find({
            restaurantId,
            isAvailable:true
        })
        res.status(200).json({
            success: true,
            data: menuItem
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {createMenuItem, getMenuItem}