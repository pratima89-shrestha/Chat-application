const express = require('express');
const { registerUser, authUser } = require('../controller/UserController');
const router = express.Router();

router.route('/').post(registerUser); // Ensure this route matches in the backend
router.route('/login').post(authUser);



module.exports = router;
