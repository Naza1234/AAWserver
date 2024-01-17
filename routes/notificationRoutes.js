const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const notificationController = require('../controllers/notificationController');

// Routes for notification operations
router.post('/notifications', notificationController.createNotification);
router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/:id', notificationController.getSingleNotification);
router.get('/notifications_by_user_id/:id', notificationController.getAllNotificationsByUserId);
router.put('/notifications/:id', notificationController.updateSingleNotification);
router.delete('/notifications/:id', notificationController.deleteSingleNotification);

module.exports = router;
