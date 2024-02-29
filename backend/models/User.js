const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    u_name: {
        type: String,
        required: true
    },
    u_email:{
        type: String,
        required: true,
        unique : true
    },
    u_number:{
        type: Number,
        required: true,
        // max: [11,"Must be 10 digits"]
    },
    u_gen:{
        type: String,
        required: true
    },
    u_password:{
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
userSchema.pre("save",async function(next){
    if(this.isModified("u_password")){
        this.u_password = await bcrypt.hash(this.u_password, 10);
    }
    next();
})

module.exports = mongoose.model("User", userSchema);