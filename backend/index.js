const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("./db");
const user = require('./routes/User');
const vendor =  require("./routes/Vendors");
const admin = require("./routes/Admin");
const contactUs = require("./routes/Contactus");

app.use(express.json());
app.use('/user',user);  
app.use('/vendor',vendor);
app.use('/adminlogin',admin)
app.use('/contactus',contactUs)
app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
})