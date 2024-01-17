const Auction = require('../models/auctionModel');
const User=require('../models/UserModel');
const Product=require('../models/ProductModel');


exports.createAuction = async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;
    
    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if the UserPaymentStatus is "free"
    if (existingUser.UserPaymentStatus !== 'free') {
      // UserPaymentStatus is "free", proceed to find auctions
      const userAuctions = await Auction.find({ userId: existingUser._id });
    
      // Array to store products from participated auctions
      // Iterate over userAuctions and find products
      for (const auction of userAuctions) {
        // Find product in the Product database
        const product = await Product.findById(auction.productId);
        
        // Check if the product is sold
        if (product && product.productSold === false) {
          // If productSold is false, return a 204 status
          return res.status(404).json();
        }
      }
      const newAuction = await Auction.create(req.body);
     
      // Send the result as a JSON response
      res.status(200).json(newAuction);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};


exports.getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({});
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAuctionPriceWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const auctions = await Auction.find({ productId: id }).sort({ _id: -1 }).limit(1);
   

    const lastAuction = auctions;

    res.status(200).json(lastAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSingleAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findById(id);
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAuction = await Auction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuction = await Auction.findByIdAndDelete(id);
    res.status(200).json(deletedAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

