const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');

// Protect middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;


    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')  // the token will be the bearer token 
    ) {
        try {
            // Extract the token from the Authorization header
            // Format: "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            //decode the token id.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by the decoded ID and attach the user to the request object
            // Exclude the password field for security
            req.user = await User.findById(decoded.id).select('-password');

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            // If token verification fails, throw an error
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    // If no token is found, throw an error
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };