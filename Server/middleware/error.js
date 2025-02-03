//To print the file not found error
const notFound = (req,res,next)=>{
const error = new Error(`Not found - ${req.originalUrl}`);
res.status(404);
next(error);
}

//For error Handling
const errorHandler = (err, req,res,next)=>{
const statusCode = res.statusCode !==200?res.statusCode:500;
res.status(statusCode);
res.json({
message:err.message,
stack:process.env.NODE_ENV === "production" ? null:err.stack,
})
}

module.exports = {notFound, errorHandler}


