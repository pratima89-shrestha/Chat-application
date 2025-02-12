const express = require('express');
const { protect } = require("../middleware/authMiddleware");
const {accessChat,fetchChats} = require("../controller/chatController");
const router = express.Router();


router.route("/").post(protect, accessChat);
router.route("/").get(protect,fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").post(protect, renameGroup);
// router.route("/rename").post(protect, removeFromGroup);
// router.route("/rename").post(protect, addToGroup);

module.exports = router;

