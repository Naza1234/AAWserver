const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const carDetailsController = require('../controllers/carDetailsController');

// Routes for car details operations
router.post('/car-details', carDetailsController.createCarDetail);
router.get('/car-details', carDetailsController.getAllCarDetails);
router.get('/car-details/:id', carDetailsController.getSingleCarDetail);
router.get('/car-details-with-id/:id', carDetailsController.getAllCarDetailsWithId);
router.put('/car-details/:id', carDetailsController.updateSingleCarDetail);
router.delete('/car-details/:id', carDetailsController.deleteSingleCarDetail);

module.exports = router;
