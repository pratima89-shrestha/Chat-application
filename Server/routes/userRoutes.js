const express = require('express');
const { registerUser, authUser, allUsers} = require('../controller/UserController');
// const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.route('/').post(registerUser).get(allUsers);
router.route('/login').post(authUser);
// router.route('/').get(allUsers);


module.exports = router;
