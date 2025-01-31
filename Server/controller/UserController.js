const asyncHandler = require("express-async-handler");
const registerUser =asyncHandler(async()=>{
const {name,email,password,pic} = req.body;   //destruturing name, ... from the body

if(!name||!email||!password){
res.status(400);
throw new Error("Please Enter all the fields");
}
});






//express-async-handler for handdling all the error

