// auctionWinnerModel.js
const mongoose = require('mongoose');

const auctionWinnerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
},
{
    timestamps: true
});

const AuctionWinner = mongoose.model('AuctionWinner', auctionWinnerSchema);

module.exports = AuctionWinner;
