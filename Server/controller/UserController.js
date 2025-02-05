const asyncHandler = require("express-async-handler");
const User = require('../model/userModel');
const generateToken = require("../config/generateToken");
const bcrypt = require('bcryptjs');

// Register a new user
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

    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword, // Use the hashed password
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

// Authenticate user and get token
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide both email and password.");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and if the password matches
    if (user && (await bcrypt.compare(password, user.password))) {
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

module.exports = { registerUser, authUser };
