const CarDetails = require('../models/CarDetailsModel');

// Create a new car detail entry
exports.createCarDetail = async (req, res) => {
  try {
    var items=[]
    for (let i = 0; i < req.body.length; i++) {
      const element = req.body[i];
     
      const newCarDetail = await CarDetails.create(element);
       items.push(newCarDetail)
      }
      res.status(201).json(items);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read all car details
exports.getAllCarDetails = async (req, res) => {
  try {
    const carDetails = await CarDetails.find({});
    res.status(200).json(carDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllCarDetailsWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const carDetails = await CarDetails.find({ productId: id });

    res.status(200).json(carDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a single car detail by ID
exports.getSingleCarDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const carDetail = await CarDetails.findById(id);
    if (!carDetail) {
      return res.status(404).json({ message: 'Car detail not found' });
    }
    res.status(200).json(carDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single car detail by ID
exports.updateSingleCarDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCarDetail = await CarDetails.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCarDetail) {
      return res.status(404).json({ message: 'Car detail not found' });
    }
    res.status(200).json(updatedCarDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a single car detail by ID
exports.deleteSingleCarDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCarDetail = await CarDetails.findByIdAndDelete(id);
    if (!deletedCarDetail) {
      return res.status(404).json({ message: 'Car detail not found' });
    }
    res.status(200).json(deletedCarDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
