const express = require('express');
const cors = require('cors'); // Import cors
const dotenv = require('dotenv');
const {chats} = require("./data/data");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


dotenv.config();
connectDB();
const app = express();
app.use(cors());


app.use('/api/user',userRoutes); //path and middleware and the use is used to mount/attach the middleware

app.get('/',(req,res)=>{
console.log("Api is running.");
})


app.get("/api/chat",(req,res)=>{
res.send(chats);
});


//to get the only one chat data using id.
app.get("/api/chat/:id",(req,res)=>{
    // console.log(req);
    const singleChat = chats.find((c)=>c._id===req.params.id);
    res.send(singleChat);
})


const PORT = process.env.PORT || 3001;
app.listen(3001,console.log(`Server started on port ${PORT}`));