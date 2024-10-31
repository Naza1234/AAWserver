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

    // Check if the product exists and whether it is sold
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.productSold) {
      return res.status(400).json({ message: 'This product has already been sold.' });
    }
    
      // Check if the auction period has passed
      const currentDateTime = new Date();
      const startDate = new Date(product.startDateTime);
      const endDate = new Date(product.endDateTime);

      if (currentDateTime >= endDate) {
        return res.status(400).json({ message: 'Auction period has already passed.' });
      }

      if (currentDateTime < startDate) {
        return res.status(400).json({ message: 'Auction has not started.' });
      }
    // If the UserPaymentStatus is "free", proceed to find active auctions
    if (existingUser.UserPaymentStatus === 'free') {
      // Find all auctions where the user is participating, with unsold products
      const activeUserAuctions = await Auction.find({ userId: existingUser._id })
      .populate({
        path: 'productId',
        select: 'productSold', // Only retrieve the productSold field
        match: { productSold: false }, // Only match products that are unsold
      });
  
      // Filter out any null products (in case populate returns null for non-matching documents)
      const activeAuctions = activeUserAuctions.filter(auction => auction.productId);

      // Check if the user is in more than 2 active auctions
      if (activeAuctions.length >= 2) {
        return res.status(400).json({ 
          message: 'You are on a free package and can only participate in 2 auctions at a time.' 
        });
      }
    }
    
    // Create a new auction since the user is eligible
    const lastAuction = await Auction.findOne().sort({ createdAt: -1 }); 

    // Check if there’s an auction already and compare amounts
    if (lastAuction && amount <= lastAuction.amount) {
      return res.status(400).json({
        error: `The bid amount must be more than the previous auction's amount of ${lastAuction.amount}.`,
      });
    }

    // If valid, create the new auction
    const newAuction = await Auction.create(req.body);

    
    // Send the new auction as a JSON response
    res.status(200).json(newAuction);
  }  catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};


exports.createAuctionNow = async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;
    
    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product exists and whether it is sold
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.productSold) {
      return res.status(400).json({ message: 'This product has already been sold.' });
    }
    
      // Check if the auction period has passed
      const currentDateTime = new Date();
      const startDate = new Date(product.startDateTime);
      const endDate = new Date(product.endDateTime);

      if (currentDateTime >= endDate) {
        return res.status(400).json({ message: 'Auction period has already passed.' });
      }

      if (currentDateTime < startDate) {
        return res.status(400).json({ message: 'Auction cannot start in the past.' });
      }
    // If the UserPaymentStatus is "free", proceed to find active auctions
    if (existingUser.UserPaymentStatus === 'free') {
      // Find all auctions where the user is participating, with unsold products
      const activeUserAuctions = await Auction.find({ userId: existingUser._id })
      .populate({
        path: 'productId',
        select: 'productSold', // Only retrieve the productSold field
        match: { productSold: false }, // Only match products that are unsold
      });
  
      // Filter out any null products (in case populate returns null for non-matching documents)
      const activeAuctions = activeUserAuctions.filter(auction => auction.productId);

      // Check if the user is in more than 2 active auctions
      if (activeAuctions.length >= 2) {
        return res.status(400).json({ 
          message: 'You are on a free package and can only participate in 2 auctions at a time.' 
        });
      }
    }
    
    // Create a new auction since the user is eligible
    const newAuction = await Auction.create(req.body);
    
    // Send the new auction as a JSON response
    res.status(200).json(newAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getTodaysAuctions = async (req, res) => {
  try {
    // Get today's date
    const today = new Date();

    // Fetch all auctions from the database
    const auctions = await Product.find({});

    // Array to store auctions that meet the criteria
    const todaysAuctions = [];

    // Iterate through each auction
    for (let i = 0; i < auctions.length; i++) {
      const auction = auctions[i];

      // Convert startingDateTime and endDateTime strings to Date objects
      const startingDateTime = new Date(auction.startingDateTime);
      const endDateTime = new Date(auction.endDateTime);

      // Check if productSold is false and the auction is active today
      if (
        auction.productSold === false &&
        startingDateTime <= today &&
        endDateTime >= today
      ) {
        todaysAuctions.push(auction);
      }
    }

    res.status(200).json(todaysAuctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInventory = async (req, res) => {
  try {
    // Get today's date
    const today = new Date();

    // Fetch all auctions from the database
    const auctions = await Product.find({});

    // Array to store auctions that meet the criteria
    const Auctions = [];

    // Iterate through each auction
    for (let i = 0; i < auctions.length; i++) {
      const auction = auctions[i];


      // Check if productSold is false and the auction is active today
      if (
        auction.productSold === false
      ) {
        Auctions.push(auction);
      }
    }

    res.status(200).json(Auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAuctionByCalender = async (req, res) => {
    try {
        // Extract start date and end date from req.body
        const { startDate, endDate } = req.body;

        // Parse the dates to JavaScript Date objects
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        // Fetch all products
        const allProducts = await Product.find({ productSold: false });

        // Filter products based on the given criteria
        const filteredProducts = allProducts.filter(product => {
            const startingDateTime = new Date(product.startingDateTime);
            return startingDateTime >= startDateObj && startingDateTime <= endDateObj;
        });

        res.status(200).json(filteredProducts);
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

