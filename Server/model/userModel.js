const mongoose = require('mongoose');

const userModel = mongoose.Schema(
    {
        name:{ type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, },
        pic:{type:String, required:true, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5-koyOCa1_xg_7pJp8GB5nVlV_G-79Ow-hw&s",},
    },
    {
    timestamps:true,
    }
);
const User = mongoose.model("User",userModel);
module.exports= User;