// conversation.model.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model, adjust the ref accordingly
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model, adjust the ref accordingly
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
