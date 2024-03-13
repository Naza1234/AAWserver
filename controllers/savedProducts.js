// SavedProductsController.js
const SavedProducts = require('../models/savedProducts');
const Product = require('../models/ProductModel');

exports.getAllSavedProduct = async (req, res) => {
  try {
    const SavedProduct = await SavedProducts.find({});
    res.status(200).json(SavedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllSavedProductByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all SavedProducts for the given userId
    const savedProducts = await SavedProducts.find({ userId: id });

    // Fetch detailed product information for each saved product
    const detailedProducts = await Promise.all(savedProducts.map(async (savedProduct) => {
      // Find the product details using productId
      const product = await Product.findById(savedProduct.productId);
      return product;
    }));

    // Respond with the detailed product information
    res.status(200).json(detailedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createSavedProducts = async (req, res) => {
    try {
      const { userId, productId } = req.body;
      
      // Check if a document with the given productId already exists
      const existingSavedProduct = await SavedProducts.findOne({ productId });
  
      // If a document with the productId already exists, return an error response
      if (existingSavedProduct) {
        return res.status(400).json({ message: 'Saved product with the same productId already exists.' });
      }
  
      // Create a new SavedProducts document if one does not already exist
      const newSavedProduct = await SavedProducts.create({ userId, productId });
      res.status(201).json(newSavedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.deleteSavedProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const SavedProducts = await SavedProducts.findByIdAndDelete(id);
    if (!SavedProducts) {
      return res.status(404).json({ message: 'Auction winner not found' });
    }
    res.status(200).json(SavedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
