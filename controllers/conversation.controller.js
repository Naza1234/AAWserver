// conversation.controller.js
const Conversation = require('../models/conversation.model');

exports.createConversation = async (req, res) => {
  try {
    const { userId, productId, message } = req.body;
    
    // Assuming userId and productId exist in your User and Product models
    const conversation = await Conversation.create({ userId, productId, message });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({});
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConversationsByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const conversations = await Conversation.find({productId:id});
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
