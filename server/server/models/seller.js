const mongoose = require("mongoose");
const Address = require("./utils/address");

const sellerSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Seller's user id is required"]
    },

    rating: {
        type: Number,
        validate: {
            validator: val => (val>=0 && val<=5),
            message: "Invalid Seller rating"
        }
    },

    brand: {
        type: String,
        required: [true, "Brand Name is required"]
    },

    location: {
        type: Address,
        required: [true, "Seller Location (Address) is required"]
    }
})

module.exports = mongoose.model("Seller", sellerSchema);