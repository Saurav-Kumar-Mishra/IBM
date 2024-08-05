const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: [true, "Token's userId is required"]
    },

    key: {
        type: String,
        required: [true, "Token's authKey is required"]
    },

    lastVisit: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
});

tokenSchema.methods.refresh = async function(){
    this.lastVisit = Date.now();
    await this.save();
}

module.exports = mongoose.model('Token', tokenSchema);
