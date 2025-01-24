const express = require('express');
const dotenv = require('dotenv');
const {chats} = require("./data/data");



const app = express();
dotenv.config();

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