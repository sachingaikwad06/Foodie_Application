const ORDER_STATUS = {
    PLACED: "PLACED",
    ACCEPTED: "ACCEPTED",
    PREPARING: "PREPARING",   // ✅ fixed spelling
    DELIVERED: "DELIVERED"
}

const allowTransaction = {
    PLACED: ["ACCEPTED"],
    ACCEPTED: ["PREPARING"],
    PREPARING: ["DELIVERED"],
    DELIVERED: []
}

module.exports = { ORDER_STATUS, allowTransaction };