const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        chatName:{
            type:String,
            trim:true  //unnecessary space will be removed from the name like in beginning and the end.
        },
        isGroupChat:{
            type:Boolean,
            default:false
        },
        users:[{   //array of users
        type:mongoose.Schema.Types.ObjectId,   //users document _id as single user will be there
        ref:"User",     //refers to the collection of users
        },
    ],
    latestMessage:{    //for displaying the latestMessage in the front
        type:mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},
    {
    timeStamps:true,  //if the new chat is added  it is going to add a timestamp
    }
)

const Chat = mongoose.model("Chat",chatModel);    //creating a model
module.exports = Chat;


//createdAt and updatedAt is created when new doc is created in mongoose
//chatName
//isGroupChat
//users
//latestMessage
//groupAdmin
