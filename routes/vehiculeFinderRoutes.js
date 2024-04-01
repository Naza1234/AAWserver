const express = require('express');
const router = express.Router();
const auctionControllers = require('../controllers/vehiculeFinderContoller');





router.get('/get-make/:productType', auctionControllers.getProductMake);
router.get('/get-model/:encodedParams', auctionControllers.getProductModels);
router.get('/get-mileage/:encodedParams', auctionControllers.getProductMileage);
router.get('/get-year/:encodedParams', auctionControllers.getProductYear);
router.get('/get-location/:encodedParams', auctionControllers.getProductLocation);
router.get('/get-product-id/:encodedParams', auctionControllers.getProductId);
router.get('/get-product/:encodedParams', auctionControllers.getProduct);







module.exports = router;
