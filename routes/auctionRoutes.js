const express = require('express');
const router = express.Router();
const auctionControllers = require('../controllers/auctionControllers');
const endAuctionControllers = require('../controllers/endAuctionControllers');




router.post('/add_action', auctionControllers.createAuction);
router.get('/', auctionControllers.getAllAuctions);
router.get('/todays-auction', auctionControllers.getTodaysAuctions);
router.get('/Inventory', auctionControllers.getInventory);
router.post('/auction-by-calender', auctionControllers.getAuctionByCalender);
router.get('/:id', auctionControllers.getSingleAuction);
router.get('/getLastAuction/:id', auctionControllers.getAuctionPriceWithId);
router.put('/:id', auctionControllers.updateAuction);
router.delete('/:id', auctionControllers.deleteAuction);

module.exports = router;

