const Product = require('../models/ProductModel');
const Auction = require('../models/auctionModel');
const AuctionWinner = require('../models/auctionWinnerModel');


// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllProductsWithUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ userId : id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllProductsWithPriceUsingUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ userId: id });
    var productWithPrice = [];
  
    for (const iterator of products) {
      // Find the latest auction for each product
      const auction = await Auction.findOne({ productId: iterator._id }).sort({ _id: -1 }).limit(1);
  
      // Add auction price to the product
      if (auction) {
        iterator.price = auction.amount;
        productWithPrice.push(iterator);
      }else{
        productWithPrice.push(iterator);
      }
  
      // Push the modified product to the array
    }
  
    res.status(200).json(productWithPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};


exports.getActiveAuctionProducts = async (req, res) => {
  try {
    const distinctProductIds = await Auction.aggregate([
      {
        $group: {
          _id: "$productId",
        },
      },
      {
        $sort: {
          _id: -1, // Sort in descending order based on the productId
        },
      },
    ]);

    let activeAuctionProductIds = [];

    if (distinctProductIds.length > 6) {
      activeAuctionProductIds = distinctProductIds.slice(0, 6);
    } else {
      activeAuctionProductIds = distinctProductIds;
    }

    const activeAuction = [];
    for (const iterator of activeAuctionProductIds) {
      const auctions = await Product.findById(iterator._id);
      activeAuction.push(auctions);
    }

    res.status(200).json(activeAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








exports.getWonProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const auctionWinners = await AuctionWinner.find({userId:id});
    const Products=[]
    for (const iterator of auctionWinners) {
      const product = await Product.findOne({_id:iterator.productId});
      Products.push(product)
    }
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a single product by ID
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single product by ID
exports.updateSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a single product by ID
exports.deleteSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
