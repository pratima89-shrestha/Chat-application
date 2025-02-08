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

//fetch all of the chat that the users is a part of 
const fetchChats = asyncHandler(async (req, res) => {
  console.log("User ID from token:", req.user._id);  // Log user ID from the token
  
  try {
    // Fetch chats where the logged-in user is part of the chat
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")  // Populate users but exclude password
      .populate("latestMessage")  // Populate the latest message
      .sort({ updatedAt: -1 });  // Sort chats by the most recent update

console.log("User ID for fetching chats:", req.user._id);


//     // If chats exist, populate the sender details for the latest message
//     const fullChats = await User.populate(chats, {
//       path: "latestMessage.sender",  // Populate sender of the latest message
//       select: "name pic email",  // Select only name, pic, and email for sender
//     });

//     console.log("Chats with populated sender details:", fullChats);  // Log populated chats

    // Return the populated chats
    res.status(200).send(fullChats);
  } catch (error) {
    console.error("Error fetching chats:", error);  // Log any errors
    res.status(400).json({ message: error.message });
    throw new Error(error.message);
  }
});



module.exports = { accessChat, fetchChats };
