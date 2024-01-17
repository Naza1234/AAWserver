// auctionWinnerController.js
const AuctionWinner = require('../models/auctionWinnerModel');

exports.getAllAuctionWinners = async (req, res) => {
  try {
    const auctionWinners = await AuctionWinner.find({});
    res.status(200).json(auctionWinners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAuctionWinner = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const auctionWinner = await AuctionWinner.create({ userId, productId });
    res.status(201).json(auctionWinner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAuctionWinnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const auctionWinner = await AuctionWinner.findByIdAndDelete(id);
    if (!auctionWinner) {
      return res.status(404).json({ message: 'Auction winner not found' });
    }
    res.status(200).json(auctionWinner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
