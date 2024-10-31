// auctionWinnerModel.js
const mongoose = require('mongoose');

const savedProductsSchema = new mongoose.Schema({
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

const savedProducts = mongoose.model('savedProducts', savedProductsSchema);

module.exports = savedProducts;
