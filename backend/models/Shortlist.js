const mongoose = require("mongoose");

const shortlistSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    vendor_id :{
        type: String
    },
    event_name :{
        type: String
    },
    date:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Shortlist", shortlistSchema);