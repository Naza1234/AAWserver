const Withdrawal = require('../models/WithdrawalModel');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
// Create a new withdrawal request
exports.createWithdrawal = async (req, res) => {
  try {
    const newWithdrawal = await Withdrawal.create(req.body);
    res.status(201).json(newWithdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createWithdrawalWithUserLogs = async (req, res) => {
  try {


    const { id } = req.params;

    const user = await User.findById(req.body.userId);
       
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(id, user.UserPassword);


      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid password' });
      }


    const newWithdrawal = await Withdrawal.create(req.body);
    res.status(201).json(newWithdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read all withdrawal requests
exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({});
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllWithdrawalsWithUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawals = await Withdrawal.find({userId: id});
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Read a single withdrawal request by ID
exports.getSingleWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal request not found' });
    }
    res.status(200).json(withdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single withdrawal request by ID
exports.updateSingleWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWithdrawal = await Withdrawal.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWithdrawal) {
      return res.status(404).json({ message: 'Withdrawal request not found' });
    }
    res.status(200).json(updatedWithdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a single withdrawal request by ID
exports.deleteSingleWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWithdrawal = await Withdrawal.findByIdAndDelete(id);
    if (!deletedWithdrawal) {
      return res.status(404).json({ message: 'Withdrawal request not found' });
    }
    res.status(200).json(deletedWithdrawal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
