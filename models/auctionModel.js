const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;

