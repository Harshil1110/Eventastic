const mongoose = require("mongoose");

const uploadImageSchema = new mongoose.Schema({
    v_id:{
        type: String,
        required: true
    },
    v_images: {
        type: Array,
        required: true
    },
    date:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model("UploadImage", uploadImageSchema);