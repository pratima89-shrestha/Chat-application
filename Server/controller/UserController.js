const asyncHandler = require("express-async-handler");
const User = require('../model/userModel');
const generateToken = require("../config/generateToken");
const bcrypt = require('bcryptjs');



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }


    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User.");
    }
});



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide both email and password.");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        res.status(401);
        throw new Error("User not found.");
    }



    // console.log("Entered password:",password);
    // console.log("Stored hashed password",user.password);

  

    // Compare the hashed password with the entered password
    const isPasswordMatch = await bcrypt.compare(password, user.password,);

    if (isPasswordMatch) {
        // If password matches, return user data and token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id), // Send token after successful login
        });
    } else {
        res.status(401);  // Unauthorized
        throw new Error("Invalid email or password.");
    }
});





// Get all users except the logged-in user
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {}; 

    // Exclude the current logged-in user
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // Use req.user._id, assuming 'user' was added to the request in the 'protect' middleware
    res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
