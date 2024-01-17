const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const withdrawalController = require('../controllers/withdrawalController');

// Routes for withdrawal operations
router.post('/withdrawals', withdrawalController.createWithdrawal);
router.post('/withdrawals/:id', withdrawalController.createWithdrawalWithUserLogs);
router.get('/withdrawals', withdrawalController.getAllWithdrawals);
router.get('/withdrawals/:id', withdrawalController.getSingleWithdrawal);
router.get('/withdrawals-with-user-id/:id', withdrawalController.getAllWithdrawalsWithUserId);
router.put('/withdrawals/:id', withdrawalController.updateSingleWithdrawal);
router.delete('/withdrawals/:id', withdrawalController.deleteSingleWithdrawal);

module.exports = router;
