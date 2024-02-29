const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/eventastic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async() => {
    console.log("connection successfully.");
    
    const response1 = await mongoose.connection.db.collection("city").find({});
    const result1 = await response1.toArray();
    
    const response2 = await mongoose.connection.db.collection("events").find({});
    const result2 = await response2.toArray();
    
    const response3 = await mongoose.connection.db.collection("event_category").find({});
    const result3 = await response3.toArray();
    
    global.city = result1;
    global.events = result2;
    global.category = result3; 
  })
  .catch((error) => {
    console.log("no connection");
  });

  module.exports = mongoose;