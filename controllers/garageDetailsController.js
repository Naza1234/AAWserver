const GarageDetails = require('../models/GarageDetailsModel');

// Create a new garage detail entry
exports.createGarageDetail = async (req, res) => {
  try {
    var items=[]
    for (let i = 0; i < req.body.length; i++) {
      const element = req.body[i];
    const newGarageDetail = await GarageDetails.create(element);
    items.push(newGarageDetail)
  }
  res.status(201).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

// Read all garage details
exports.getAllGarageDetails = async (req, res) => {
  try {
    const garageDetails = await GarageDetails.find({});
    res.status(200).json(garageDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllGarageDetailsWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const garageDetails = await GarageDetails.find({ productId: id });

    res.status(200).json(garageDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a single garage detail by ID
exports.getSingleGarageDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const garageDetail = await GarageDetails.findById(id);
    if (!garageDetail) {
      return res.status(404).json({ message: 'Garage detail not found' });
    }
    res.status(200).json(garageDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single garage detail by ID
exports.updateSingleGarageDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGarageDetail = await GarageDetails.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGarageDetail) {
      return res.status(404).json({ message: 'Garage detail not found' });
    }
    res.status(200).json(updatedGarageDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a single garage detail by ID
exports.deleteSingleGarageDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGarageDetail = await GarageDetails.findByIdAndDelete(id);
    if (!deletedGarageDetail) {
      return res.status(404).json({ message: 'Garage detail not found' });
    }
    res.status(200).json(deletedGarageDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
