const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const productsImageController = require('../controllers/productsImageController');

// Routes for product image operations
router.post('/product-images',productsImageController.upload, productsImageController.addProductImage);
router.get('/product-images', productsImageController.getAllProductImages);
router.get('/product-images/:id', productsImageController.getSingleProductImage);
router.get('/product-images-with-user-id/:id', productsImageController.getAllProductImagesWithUserId);
router.get('/won-product-images-with-user-id/:id', productsImageController.getWonProductsImg);
router.put('/product-images/:id', productsImageController.updateSingleProductImage);
router.delete('/product-images/:id', productsImageController.deleteSingleProductImage);

module.exports = router;
