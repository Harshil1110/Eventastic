const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
        type: String
    },
    code: {
        type: String
    },
    date:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Otp", otpSchema);