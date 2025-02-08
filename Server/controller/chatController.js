const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request.");
    return res.sendStatus(400);
  }

  try {
    // Check if the chat already exists between the two users
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } }, // find the current logged-in user
        { users: { $elemMatch: { $eq: userId } } }
      ]
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // Populate the sender information for the latest message
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    // If chat already exists, return it
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      // If chat doesn't exist, create a new chat
      const chatData = {
        chatName: "sender",  // Placeholder for the chat name, you can modify it
        isGroupChat: false,
        users: [req.user._id, userId],  // Logged-in user and the user with whom we want to create the chat
      };

      // Create and store the new chat in the database
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      // Return the full chat with populated user details
      res.status(200).send(FullChat);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});


//To find the chat
const fetchChats = asyncHandler(async(req,res)=>{
try{
Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).then(result=>res.send(result))
}catch(error){}
});

module.exports = { accessChat };
