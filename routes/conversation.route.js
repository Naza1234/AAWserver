// conversation.route.js
const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const conversationController = require('../controllers/conversation.controller');


router.post('/', conversationController.createConversation);
router.get('/', conversationController.getConversations);
router.get('/get-conversations-by-product-id/:id', conversationController.getConversationsByProductId);

module.exports = router;
