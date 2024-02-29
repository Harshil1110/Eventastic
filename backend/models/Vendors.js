const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const vendorSchema = new mongoose.Schema({
    v_name: {
        type: String,
        required: true
    },
    v_shop_name: {
        type: String,
        required: true
    },
    v_email:{
        type: String,
        required: true,
        unique : true
    },
    v_number:{
        type: Number,
        required: true
    },
    v_price:{
        type: Number,
        required: true
    },
    v_address:{
        type: String,
        require : true
    },
    v_disc: {
        type: String,
        required: true
    },
    v_city: {
        type: String,
        required: true
    },
    v_event: {
        type: String,
        required: true
    },
    v_category: {
        type: String,
        required: true
    },
    v_logo: {
        type: String
    },
    v_password:{
        type: String,
        required: true,
        min: [7,"Atleat 6 character is accepted"]
    },
    date:{
        type: Date,
        default : Date.now
    }
});

//converting password in to hash
vendorSchema.pre("save",async function(next){
    if(this.isModified("v_password")){
        this.v_password = await bcrypt.hash(this.v_password, 10);
    }
    next();
})

module.exports = mongoose.model("Vendor", vendorSchema);