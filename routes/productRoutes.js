const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const productController = require('../controllers/productController');


// Routes for product operations
router.post('/products',productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/active-auction-products', productController.getActiveAuctionProducts);
router.get('/products/:id', productController.getSingleProduct);
router.get('/products-with-user-id/:id', productController.getAllProductsWithUserId);
router.get('/won-products-with-user-id/:id', productController.getWonProducts);
router.get('/products-with-auction-price-using-user-id/:id', productController.getAllProductsWithPriceUsingUserId);
router.put('/products/:id', productController.updateSingleProduct);
router.delete('/products/:id', productController.deleteSingleProduct);

module.exports = router;
