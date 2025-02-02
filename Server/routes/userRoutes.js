const express = require('express')  //import express
const {registerUser, authUser} = require('../controller/UserController');
const router = express.Router()    //create instance of an router from express


//one endpoint for login and one endpint for login
router.route('/').post(registerUser);
router.route('/login').post(authUser);


module.exports = router; 
