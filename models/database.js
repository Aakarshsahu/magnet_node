const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL).then(function(){
    console.log("DATABSE IS CONNECTED SUCCESSFULLY");
}).catch(function(error){
    console.log(error);
})