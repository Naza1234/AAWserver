const Payment = require('../models/paymentModel');

exports.createPayment = async (req, res) => {
  try {
    const { userId, amount, productId } = req.body;
    const payment = await Payment.create({ userId, amount, productId });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSinglePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);
    res.status(200).json(deletedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
