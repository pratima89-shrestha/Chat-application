const asyncHandler = require("express-async-handler");
const User = require('../model/userModel');
const generateToken = require("../config/generateToken");
const bcrypt = require('bcryptjs');


// //for checking the hashed and the other password
// const password = '123';
// const hashedPassword = '$2a$10$1GooOaBe9ZLT5rhtliavnOpywFd6eqi4e8FEzILJc1It6kXhdvqK6';

// // Compare plaintext password with the hashed one
// bcrypt.compare(password, hashedPassword, (err, isMatch) => {
//     if (err) {
//         console.log("Error:", err);
//     } else {
//         console.log("Password match result:", isMatch); // Should be true if passwords match
//     }
// });



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
console.log("Hashed Password:", hashedPassword); 



    // Create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword, // Save the hashed password
        pic,
    });

    // Check if user was created successfully
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id) // Generate and send token
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

    // Compare the hashed password with the one in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
console.log("Entered Password:", password);
console.log("Stored Hashed Password:", user.password);
console.log("Password Match Result:", isPasswordMatch);  // This should log `true` if they match


    // If password matches, respond with user data and token
    if (isPasswordMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id), // Generate and send token
        });
    } else {
        res.status(401);
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
    const users = await User.find(keyword); // Use req.user._id, assuming 'user' was added to the request in the 'protect' middleware
    res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
