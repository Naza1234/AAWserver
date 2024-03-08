const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const productsImageController = require('../controllers/coverImage.controller');

// Routes for product image operations
router.post('/OtherImage',productsImageController.upload, productsImageController.addProductImage);
router.get('/OtherImage', productsImageController.getAllProductImages);
router.get('/OtherImage/:id', productsImageController.getSingleProductImage);
router.get('/OtherImage-with-user-id/:id', productsImageController.getAllProductImagesWithUserId);
router.get('/won-OtherImage-with-user-id/:id', productsImageController.getWonProductsImg);
router.put('/OtherImage/:id', productsImageController.updateSingleProductImage);
router.delete('/OtherImage/:id', productsImageController.deleteSingleProductImage);

module.exports = router;
