const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    f_content:{
        type: String
    },
    f_rating:{
        type: String
    },
    user_id: {
        type: String
    },
    vendor_id :{
        type: String
    },
    date:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);