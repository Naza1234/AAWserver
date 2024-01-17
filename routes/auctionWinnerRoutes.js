// auctionWinnerRoutes.js
const express = require('express');
const router = express.Router();

const auctionWinnerController = require('../controllers/auctionWinnerController');

router.get('/', auctionWinnerController.getAllAuctionWinners);
router.post('/', auctionWinnerController.createAuctionWinner);
router.delete('/:id', auctionWinnerController.deleteAuctionWinnerById);

module.exports = router;
