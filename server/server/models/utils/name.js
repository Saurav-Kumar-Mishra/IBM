const mongoose = require("mongoose");
const {isAlpha} = require("validator");

const nameSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is required"],
        minLength: 3,
        maxLength: 20,
        validate: {
            validator: isAlpha,
            message: "Invalid firstName"
        }
    },

    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        validate: {
            validator: isAlpha,
            message: "Invalid firstName"
        }
    }
},
{
    _id: false
})

module.exports = nameSchema;