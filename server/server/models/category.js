const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        minLength: [3, "Category name must have atleast 3 characters"],
        maxLength: [50, "Category name must have atmost 500 characters"],
    },
    
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
        index: true,
    },

    priceRange: {
        min: {
            type: Number,
            default: Infinity,
        },

        max: {
            type: Number,
            default: 0
        }
    },

    productsCount: {
        type: Number,
        required: [true, "Listing stock is required"],
        validate: [
            {
                validator: Number.isInteger,
                message: "S should be an integer value"
            },
            {
                validator: val => val >= 0,
                message: "Stock value can't be negative"
            }
        ]
    },

    itemsSold: {
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

categorySchema.pre("validate", function(){
    if(this.min>this.max){
        this.invalidate("Invalid Price Range");
    }
})

module.exports = mongoose.model("Category", categorySchema);