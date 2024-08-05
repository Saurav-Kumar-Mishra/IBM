const mongoose = require("mongoose");
const Name = require("./name");
const {isInt} = require("validator"); 


const addressSchema = new mongoose.Schema({

    street: {
        type: String,
        required: [true, "Street Address is required"],
        minLength: [2, "Street Address must have 2 characters atleast"],
        maxLength: [50, "Street Address can have atmost 50 characters"],
    },

    district: {
        type: String,
        requiredt: [true, "Address's district is required"]
    },

    state: {
        type: String,
        required: [true, "Address's state is required"]
    },

    pincode: {
        type: String,
        required: [true, "Address pincode is requried"],
        minLength: [6,"Pincode must have 6 digits"],
        maxLength: [6, "Pincode must have 6 digits"],
        validate: {
            validator: isInt,
            message: "Invalid Pin Code"
        }
    }
},
{
    _id: false
})

// addressSchema.post("validate", async function(){
//     const res = await fetch(`https://api.postalpincode.in/pincode/${this.pincode}`);

//     if (!response.ok) {
//         throw new Error(`Postal API response not ok: ${response.statusText}`);
//     }

//     const data = (await res.json())[0];

//     if(data.status!=="Success")
//         this.invalidate("Invalid Pin Code");

//     const postOffice = data.PostOffice[0];

//     if(this.state!==postOffice.state)
//         this.invalidate(`Invalid Address, No ${this.state} state found on ${this.pincode} pincode`);

//     if(this.district!==postOffice.district)
//         this.invalidate(`Invalid Address, No ${this.district} district found on ${this.pincode} pincode`)

// });

module.exports = addressSchema;