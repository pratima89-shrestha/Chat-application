const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");
const asyncHandler = require("express-async-handler");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       //decodes token id
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists
  if (req.headers.authorization) {
    // Check if it starts with 'Bearer'
    if (req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        console.log("Token received:", token);

        // Decodes token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        // Find the user based on the decoded ID
        req.user = await User.findById(decoded.id).select("-password");
        console.log("User found:", req.user);

        // Continue to the next middleware or route handler
        next();
      } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      // If the token does not start with 'Bearer', log and throw an error
      console.error("Authorization header exists but does not contain 'Bearer'");
      res.status(401);
      throw new Error("Not authorized, invalid token format");
    }
  } else {
    // If there is no authorization header
    console.error("Authorization header is missing");
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


module.exports = { protect };