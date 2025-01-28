const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            // useNewUrlParser: true,  // they are not needed in 4.0 or above versions
            // useUnifiedTopology:true,
            // // useFindAndModify:true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error:${error.message}`);
        process.exit();   //exit (0)->success and (1)=shutdown on failure
    }
}
module.exports = connectDB;