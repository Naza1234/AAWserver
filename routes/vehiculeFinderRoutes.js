const express = require('express');
const router = express.Router();
const auctionControllers = require('../controllers/vehiculeFinderContoller');





router.get('/get-make/:productType', auctionControllers.getProductModels);







module.exports = router;
