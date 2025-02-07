const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");

const accessChat = asyncHandler(async(req,res)=>{
const {userId} = req.body;

if(!userId){
console.log("UserId param not sent with request.");
return res.sendStatus(400);
}

var isChat = await Chat.find({  
isGroupChat:false,
$and:[
{users:{$elemMatch:{$eq:req.user._id}}},  //find the current loged in user
{users:{$elemMatch:{$eq:userId}}}
]
}).populate("users","-password")
.populate("latestMessage");

isChat = await User.populate(isChat,{
path:"latestMessage.sender",
select:"name pic email",
});


if(isChat.length>0){
res.send(isChat[0]);
}
else{
var chatData ={
chatName:"sender",
isGroupChat:false,
users:[req.user._id,userId],              //logged in user and the user with whom we wan to create the chat
};
}
})

