//JWT is helps us to authorize the user 
//The user will send the JWT tokens which will help to authorize the user
const jwt = require("jsonwebtoken");

const generateToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{
expiresIn:"40d",
});
};

module.exports=generateToken;
