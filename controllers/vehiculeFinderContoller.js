const ProductModel = require('../models/ProductModel');

exports.getProductModels = async (req, res) => {
    try {
      // Extract the value from the parameter
      const productType = req.params.productType;
  
      // Check if the productType is "All Vehicles"
      if (productType === "All Vehicles") {
        // Query all products from the database
        const allProducts = await ProductModel.find();
    
        // Extract unique product Makes excluding null values
        const uniqueMakes = [];
        for (const product of allProducts) {
            if (product.Make && !uniqueMakes.includes(product.Make)) {
                uniqueMakes.push(product.Make);
            }
        }
    
        // Send the list of unique product Makes in the response
        res.status(200).json(uniqueMakes );
    }else if (productType === "Salvage Vehicles") {
        // Query salvage vehicles with qualification "As-Is Condition (Major Repairs)"
        const salvageVehicles = await ProductModel.find({ qualification: "As-Is Condition (Major Repairs)" });
  
        // Extract unique product Makes from salvage vehicles excluding null values
        const uniqueMakes = [];
        for (const product of salvageVehicles) {
            if (product.Make && !uniqueMakes.includes(product.Make)) {
                uniqueMakes.push(product.Make);
            }
        }
  
        // Send the list of unique product Makes for salvage vehicles in the response
        res.status(200).json( uniqueMakes );
      } else if (productType === "Used Vehicles") {
        // Query used vehicles with qualification not equal to "As-Is Condition (Major Repairs)"
        const usedVehicles = await ProductModel.find({ qualification: { $ne: "As-Is Condition (Major Repairs)" } });
  
        // Extract unique product Makes from used vehicles excluding null values
        const uniqueMakes = [];
        for (const product of usedVehicles) {
            if (product.Make && !uniqueMakes.includes(product.Make)) {
                uniqueMakes.push(product.Make);
            }
        }
  
        // Send the list of unique product Makes for used vehicles in the response
        res.status(200).json( uniqueMakes );
      } else {
        // If productType doesn't match any of the specified values, respond with an error
        res.status(400).json({ message: "Invalid product type" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  
  
  