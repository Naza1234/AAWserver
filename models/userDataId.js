const mongoose = require('mongoose');

const userIdSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userIdCard: {
    type: String,
    required: true
  }
}, { timestamps: true });

const UserId = mongoose.model('userId', userIdSchema);

module.exports = UserId;

