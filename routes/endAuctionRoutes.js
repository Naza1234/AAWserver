// routes/endAuctionRoutes.js

const express = require('express');
const router = express.Router();
const endAuctionController = require('../controllers/endAuctionControllers');

// Routes for endAuction operations
router.get('/endAuctions', endAuctionController.EndAuction);


module.exports = router;