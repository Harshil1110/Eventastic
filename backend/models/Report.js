const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    r_reason:{
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

module.exports = mongoose.model("Report", reportSchema);