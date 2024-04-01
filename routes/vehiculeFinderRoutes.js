const express = require('express');
const router = express.Router();
const auctionControllers = require('../controllers/vehiculeFinderContoller');





router.get('/get-make/:productType', auctionControllers.getProductMake);
router.get('/get-model/:encodedParams', auctionControllers.getProductModels);
router.get('/get-mileage/:encodedParams', auctionControllers.getProductMileage);







module.exports = router;
