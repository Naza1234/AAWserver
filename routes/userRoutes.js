const express = require('express');
const router = express.Router();
const endAuctionControllers = require('../controllers/endAuctionControllers');
const userController = require('../controllers/userController');

// Routes for user operations
router.post('/users/signUp',userController.upload ,userController.createUser);
router.post('/users/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSingleUser);
router.put('/users/:id', userController.updateSingleUser);
router.put('/users/changePasswordWithOldPassword/:id', userController.ChangeUserPasswordByOldPassword);
router.delete('/users/:id', userController.deleteSingleUser);

module.exports = router;
