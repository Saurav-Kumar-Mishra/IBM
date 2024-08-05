const mongoose = require("mongoose");
const Name = require("./utils/name");
const Address = require("./utils/address");
const { isEmail, isStrongPassword, isInt } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: Name,
        required: [true, "User Name is required"]
    },
    email: {
        type: String,
        validate: {
            validator: isEmail,
            message: "Invalid Email Address"
        },
        required: [true, "User email is required"]
    },
    address: {
        type: Address
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        validate: {
            validator: val => isStrongPassword(val, {
                minLength: 6,
                minUppercase: 1,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 0
            }),
            message: "User Password must contain at least 6 characters including a number, an uppercase, and a lowercase letter"
        }
    },
    cart: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Product ids is required in cart"]
            },
            quantity: {
                type: Number,
                validate: {
                    validator: val=> val>0,
                    message: "Invalid cart product quanitity"
                }
            }
        }],
        default: []
    },
    sellerProfile: {
        type: {
            status: {
                type: String,
                required: [true, "User's seller status is required"],
                enum: ["Pending", "Active", "Blocked"],
                default: "Pending"
            },
            sellerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Seller"
            }
        },
        default: null
    }
});

userSchema.pre("save", async function (next) {
    if (this.sellerProfile && this.sellerProfile.status !== "Pending" && !this.sellerProfile.sellerId) {
        return next(new Error("Seller id is missing for an active or blocked seller profile"));
    }

    if (this.isNew || this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema);
