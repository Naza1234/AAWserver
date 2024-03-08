const mongoose = require('mongoose');

const otherProductImageSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

const otherProductImage = mongoose.model('otherProductImage', otherProductImageSchema);

module.exports = otherProductImage;

