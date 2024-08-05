const mongoose = require("mongoose");
const {isInt} = require("validator");
const { default: isURL } = require("validator/lib/isURL");

const orderItemSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: false
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "OrderItem Category is required"]
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: [true, "Seller Id is required"]
    },

    title: {
        type: String,
        required: [true, "OrderItem Name is required"],
        minLength: [5, "OrderItem name must have atleast 5 characters"],
        maxLength: [30, "OrderItem name must have atmost 30 characters"]
    },

    description: {
        type: String,
        required: [true, "OrderItem description is required"],
        minLength: [10, "OrderItem description must have atleast 20 characters"],
        maxLength: [50, "OrderItem description must have atmost 50 characters"]
    },

    price: {
        type: Number,
        required: [true, "Listing price is required"],
        validate: {
            validator: val => val > 0,
            message: "Price value must be greater than zero"
        }
    },

    image: {
        type: String,
        required: [true, "OrderItem Image is requried"],
        validate: {
            validator: isURL,
            message: "Invalid image URL"
        }
    },

    quantity: {
        type: Number,
        required: [true, "Listing stock is required"],
        validate: [
            {
                validator: Number.isInteger,
                message: "Stock should be an integer value"
            },
            {
                validator: val => val >= 0,
                message: "Stock value can't be negative"
            }
        ]
    },

})

module.exports = orderItemSchema;