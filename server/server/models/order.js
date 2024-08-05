const mongoose = require("mongoose");
const OrderItem = require("./utils/orderItem");

const orderSchema = new mongoose.Schema({
    item: {
        type: OrderItem,
        required: [true, "Order's item is required"]
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: [true, "Seller Id is required"]
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Order's customer Id is required"]
    },
    status: {
        type: String,
        enum: ["In Process", "Can't be fulfilled", "Ready to Deliver", "In Shipment", "Delivered", "Delivery Rejected", "Return"],
        required: [true, "Order status is required"],
        default: "In Process"
    },
    orderDate: {
        type: Date,
        required: [true, "Order date is required"],
        default: Date.now
    },
    timeline: {
        type: [{
            status: { type: String, required: [true, "Timeline Status is required"] },
            date: { type: Date, required: [true, "Timeline date is required"], default: Date.now }
        }],
        required: [true, "Order timeline is required"],
        default: [{ status: "Order Initiated", date: Date.now() }]
    }
});

orderSchema.pre("save", function(next) {
    if (this.isNew || this.isModified("status")) {
        this.timeline.push({ status: this.status, date: Date.now() });
    }
    next();
});

module.exports = mongoose.model("Order", orderSchema);
