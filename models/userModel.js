const mongoose = require("mongoose");
const userModel = mongoose.Schema({
    filename: String,
    size: Number,
    imageUrl : String,
    
})

module.exports = mongoose.model("user",userModel);
