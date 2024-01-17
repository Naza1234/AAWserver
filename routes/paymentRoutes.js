const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const paymentControllers = require('../controllers/paymentControllers');

router.post('/', paymentControllers.createPayment);
router.get('/', paymentControllers.getAllPayments);
router.get('/:id', paymentControllers.getSinglePayment);
router.put('/:id', paymentControllers.updatePayment);
router.delete('/:id', paymentControllers.deletePayment);

module.exports = router;
