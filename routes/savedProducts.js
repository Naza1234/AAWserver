// SavedProductsRoutes.js
const express = require('express');
const router = express.Router();

const SavedProductsController = require('../controllers/savedProducts');

router.get('/', SavedProductsController.getAllSavedProduct);
router.get('/saved-products-by-user-id/:id', SavedProductsController.getAllSavedProductByUserId);
router.post('/', SavedProductsController.createSavedProducts);
router.delete('/:id', SavedProductsController.deleteSavedProductsById);

module.exports = router;
