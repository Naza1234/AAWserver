const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const garageDetailsController = require('../controllers/garageDetailsController');

// Routes for garage details operations
router.post('/garage-details', garageDetailsController.createGarageDetail);
router.get('/garage-details', garageDetailsController.getAllGarageDetails);
router.get('/garage-details/:id', garageDetailsController.getSingleGarageDetail);
router.get('/garage-details-with-id/:id', garageDetailsController.getAllGarageDetailsWithId);
router.put('/garage-details/:id', garageDetailsController.updateSingleGarageDetail);
router.delete('/garage-details/:id', garageDetailsController.deleteSingleGarageDetail);

module.exports = router;
