const mongoose = require("mongoose");
const {isInt} = require("validator");
const { default: isURL } = require("validator/lib/isURL");

const productSchema = new mongoose.Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product Category is required"],
        index: true
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: [true, "Seller Id is required"]
    },

    title: {
        type: String,
        required: [true, "Product Name is required"],
        minLength: [5, "Product name must have atleast 5 characters"],
        maxLength: [100, "Product name must have atmost 100 characters"]
    },

    description: {
        type: String,
        required: [true, "Product description is required"],
        minLength: [50, "Product description must have atleast 50 characters"],
        maxLength: [500, "Product description must have atmost 500 characters"]
    },

    retailPrice: {
        type: Number,
        required: [true, "Listing price is required"],
        validate: {
            validator: val => val > 0,
            message: "Price value must be greater than zero"
        },
    },

    discountedPrice: {
        type: Number,
        validate: {
            validator: val => val > 0,
            message: "Price value must be greater than zero"
        },
    },

    images: {
        type: [String],
        required: [true, "Product Image is requried"],
        validate: {
            validator: val => val.forEach(url=> isURL(url)),
            message: "Invalid image URL"
        }
    },

    rating: {
        type: Number,
        required: false,
        validate: {
            validator: val=> (val>=0 && val<=5),
            message: "Invalid Product Rating"
        },
        default: null
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

    sold: {
        type: Number,
        required: [true, "Listing stock is required"],
        default: 0,
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

module.exports = mongoose.model("Product", productSchema);