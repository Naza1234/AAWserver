const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');

// Routes for contact us operations
router.post('/contactUs', contactUsController.createContactUsEntry);
router.get('/contactUs', contactUsController.getAllContactUsEntries);
router.get('/contactUs/:id', contactUsController.getSingleContactUsEntry);
router.delete('/contactUs/:id', contactUsController.deleteSingleContactUsEntry);

module.exports = router;
