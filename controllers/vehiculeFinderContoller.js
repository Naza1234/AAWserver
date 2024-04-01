const ProductModel = require('../models/ProductModel');

exports.getProductMake = async (req, res) => {
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



  
 // Function to decode a URL-encoded string into an object
function decodeString(str) {
    const params = {};
    str.split("&").forEach(param => {
        const [key, value] = param.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

exports.getProductModels = async (req, res) => {
    try {
        // Extract the encoded string from the parameters
        const encodedParams = req.params.encodedParams;

        // Decode the encoded string using the decodeString function
        const decodedParams = decodeString(encodedParams);
        const productType = decodedParams.name;

        if (productType === "All Vehicles") {
            // Query all products from the database
            const allProducts = await ProductModel.find();

            // Extract unique product Models for the selected product
            const selectedModel = decodedParams.Selected;

            // Extract unique product Models excluding null values
            const uniqueModels = [];
            for (const product of allProducts) {
                if (product.Make === selectedModel && !uniqueModels.includes(product.Model)) {
                    uniqueModels.push(product.Model);
                }
            }

            // Send the list of unique product Models in the response
            res.status(200).json(uniqueModels);
        } else if (productType === "Salvage Vehicles") {
            // Query salvage vehicles with qualification "As-Is Condition (Major Repairs)"
            const salvageVehicles = await ProductModel.find({ qualification: "As-Is Condition (Major Repairs)" });

            const selectedModel = decodedParams.Selected;

            // Extract unique product Models excluding null values
            const uniqueModels = [];
            for (const product of salvageVehicles) {
                if (product.Make === selectedModel && !uniqueModels.includes(product.Model)) {
                    uniqueModels.push(product.Model);
                }
            }

            // Send the list of unique product Makes for salvage vehicles in the response
            res.status(200).json(uniqueMakes);
        } else if (productType === "Used Vehicles") {
            // Query used vehicles with qualification not equal to "As-Is Condition (Major Repairs)"
            const usedVehicles = await ProductModel.find({ qualification: { $ne: "As-Is Condition (Major Repairs)" } });

            const selectedModel = decodedParams.Selected;

            // Extract unique product Models excluding null values
            const uniqueModels = [];
            for (const product of usedVehicles) {
                if (product.Make === selectedModel && !uniqueModels.includes(product.Model)) {
                    uniqueModels.push(product.Model);
                }
            }


            // Send the list of unique product Makes for used vehicles in the response
            res.status(200).json(uniqueMakes);
        } else {
            // If productType doesn't match any of the specified values, respond with an error
            res.status(400).json({ message: "Invalid product type" });
        }
    } catch (error) {
        // If an error occurs during decoding or processing, handle it here
        res.status(500).json({ message: error.message });
    }
};

exports.getProductMileage = async (req, res) => {
    try {
        // Extract the encoded string from the parameters
        const encodedParams = req.params.encodedParams;

        // Decode the encoded string using the decodeString function
        const decodedParams = decodeString(encodedParams);
        const productType = decodedParams.name;

        if (productType === "All Vehicles") {
            // Query all products from the database
            const allProducts = await ProductModel.find();

            // Extract unique product Models for the selected product
            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;

            // Extract unique product Models excluding null values
            const uniqueOdometer = [];
            for (const product of allProducts) {
                if (product.Make === selectedMake && product.Model === selectedModel &&  !uniqueOdometer.includes(product.OdoMeter)) {
                    uniqueOdometer.push(product.OdoMeter);
            
                }
            
            }

            // Send the list of unique product Models in the response
            res.status(200).json(uniqueOdometer);
        } else if (productType === "Salvage Vehicles") {
            // Query salvage vehicles with qualification "As-Is Condition (Major Repairs)"
            const salvageVehicles = await ProductModel.find({ qualification: "As-Is Condition (Major Repairs)" });

             // Extract unique product Models for the selected product
             const selectedModel = decodedParams.SelectedModel;
             const selectedMake = decodedParams.SelectedMake;
 
             // Extract unique product Models excluding null values
             const uniqueOdometer = [];
             for (const product of salvageVehicles) {
                 if (product.Make === selectedMake && product.Model === selectedModel &&  !uniqueOdometer.includes(product.OdoMeter)) {
                     uniqueOdometer.push(product.OdoMeter);
                 }
             }
 
             // Send the list of unique product Models in the response
             res.status(200).json(uniqueOdometer);
        } else if (productType === "Used Vehicles") {
            // Query used vehicles with qualification not equal to "As-Is Condition (Major Repairs)"
            const usedVehicles = await ProductModel.find({ qualification: { $ne: "As-Is Condition (Major Repairs)" } });

             // Extract unique product Models for the selected product
             const selectedModel = decodedParams.SelectedModel;
             const selectedMake = decodedParams.SelectedMake;
 
             // Extract unique product Models excluding null values
             const uniqueOdometer = [];
             for (const product of usedVehicles) {
                 if (product.Make === selectedMake && product.Model === selectedModel &&  !uniqueOdometer.includes(product.OdoMeter)) {
                     uniqueOdometer.push(product.OdoMeter);
                 }
             }
 
             // Send the list of unique product Models in the response
             res.status(200).json(uniqueOdometer);
        } else {
            // If productType doesn't match any of the specified values, respond with an error
            res.status(400).json({ message: "Invalid product type" });
        }
    } catch (error) {
        // If an error occurs during decoding or processing, handle it here
        res.status(500).json({ message: error.message });
    }
};

exports.getProductYear = async (req, res) => {
    try {
        // Extract the encoded string from the parameters
        const encodedParams = req.params.encodedParams;

        // Decode the encoded string using the decodeString function
        const decodedParams = decodeString(encodedParams);
        const productType = decodedParams.name;

        if (productType === "All Vehicles") {
            // Query all products from the database
            const allProducts = await ProductModel.find();

            // Extract unique product Models for the selected product
            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;
            const startingMeter = decodedParams.FromOdeaMeter;
            const endingMeter = decodedParams.ToOdeaMeter;
            
            // Extract unique product Years excluding null values
            const uniqueYear = [];
            for (const product of allProducts) {
                if (product.Make === selectedMake && product.Model === selectedModel && !uniqueYear.includes(product.Year)) {
                    if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                        uniqueYear.push(product.Year);
                    }
                }
            }
            
            // Send the list of unique product Years in the response
            res.status(200).json(uniqueYear);
            
        } else if (productType === "Salvage Vehicles") {
            // Query salvage vehicles with qualification "As-Is Condition (Major Repairs)"
            const salvageVehicles = await ProductModel.find({ qualification: "As-Is Condition (Major Repairs)" });

            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;
            const startingMeter = decodedParams.FromOdeaMeter;
            const endingMeter = decodedParams.ToOdeaMeter;
            
            // Extract unique product Years excluding null values
            const uniqueYear = [];
            for (const product of salvageVehicles) {
                if (product.Make === selectedMake && product.Model === selectedModel && !uniqueYear.includes(product.Year)) {
                    if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                        uniqueYear.push(product.Year);
                    }
                }
            }
            
            // Send the list of unique product Years in the response
            res.status(200).json(uniqueYear);
            
        } else if (productType === "Used Vehicles") {
            // Query used vehicles with qualification not equal to "As-Is Condition (Major Repairs)"
            const usedVehicles = await ProductModel.find({ qualification: { $ne: "As-Is Condition (Major Repairs)" } });

             // Extract unique product Models for the selected product
             const selectedMake = decodedParams.SelectedMake;
             const selectedModel = decodedParams.Selected;
             const startingMeter = decodedParams.FromOdeaMeter;
             const endingMeter = decodedParams.ToOdeaMeter;
             
             // Extract unique product Years excluding null values
             const uniqueYear = [];
             for (const product of usedVehicles) {
                 if (product.Make === selectedMake && product.Model === selectedModel && !uniqueYear.includes(product.Year)) {
                     if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                         uniqueYear.push(product.Year);
                     }
                 }
             }
             
             // Send the list of unique product Years in the response
             res.status(200).json(uniqueYear);
             
        } else {
            // If productType doesn't match any of the specified values, respond with an error
            res.status(400).json({ message: "Invalid product type" });
        }
    } catch (error) {
        // If an error occurs during decoding or processing, handle it here
        res.status(500).json({ message: error.message });
    }
};


exports.getProductLocation = async (req, res) => {
    try {
        // Extract the encoded string from the parameters
        const encodedParams = req.params.encodedParams;

        // Decode the encoded string using the decodeString function
        const decodedParams = decodeString(encodedParams);
        const productType = decodedParams.name;

        if (productType === "All Vehicles") {
            // Query all products from the database
            const allProducts = await ProductModel.find();

            // Extract unique product Models for the selected product
            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;
            const startingMeter = decodedParams.FromOdeaMeter;
            const endingMeter = decodedParams.ToOdeaMeter;
            const startingYear = decodedParams.FromYear;
            const endingYear = decodedParams.ToYear
            // Extract unique product Years excluding null values
            const uniqueLocation = [];
            for (const product of allProducts) {
                if (product.Make === selectedMake && product.Model === selectedModel && !uniqueLocation.includes(product.Location)) {
                    if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                        if (product.Year >= startingYear || product.Year <= endingYear) {
                            uniqueLocation.push(product.Location);
                        }
                    }
                }
            }
            
            // Send the list of unique product Years in the response
            res.status(200).json(uniqueLocation);
            
        } else if (productType === "Salvage Vehicles") {
            // Query salvage vehicles with qualification "As-Is Condition (Major Repairs)"
            const salvageVehicles = await ProductModel.find({ qualification: "As-Is Condition (Major Repairs)" });

            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;
            const startingMeter = decodedParams.FromOdeaMeter;
            const endingMeter = decodedParams.ToOdeaMeter;
            const startingYear = decodedParams.FromYear;
            const endingYear = decodedParams.ToYear
            // Extract unique product Years excluding null values
            const uniqueLocation = [];
            for (const product of salvageVehicles) {
                if (product.Make === selectedMake && product.Model === selectedModel && !uniqueLocation.includes(product.Location)) {
                    if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                        if (product.Year >= startingYear || product.Year <= endingYear) {
                            uniqueLocation.push(product.Location);
                        }
                    }
                }
            }
            
            // Send the list of unique product Years in the response
            res.status(200).json(uniqueLocation);
            
        } else if (productType === "Used Vehicles") {
            // Query used vehicles with qualification not equal to "As-Is Condition (Major Repairs)"
            const usedVehicles = await ProductModel.find({ qualification: { $ne: "As-Is Condition (Major Repairs)" } });

             // Extract unique product Models for the selected product
             const selectedMake = decodedParams.SelectedMake;
             const selectedModel = decodedParams.Selected;
             const startingMeter = decodedParams.FromOdeaMeter;
             const endingMeter = decodedParams.ToOdeaMeter;
             const startingYear = decodedParams.FromYear;
             const endingYear = decodedParams.ToYear
             // Extract unique product Years excluding null values
             const uniqueLocation = [];
             for (const product of usedVehicles) {
                 if (product.Make === selectedMake && product.Model === selectedModel && !uniqueLocation.includes(product.Location)) {
                     if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                         if (product.Year >= startingYear || product.Year <= endingYear) {
                             uniqueLocation.push(product.Location);
                         }
                     }
                 }
             }
             
             // Send the list of unique product Years in the response
             res.status(200).json(uniqueLocation);
             
        } else {
            // If productType doesn't match any of the specified values, respond with an error
            res.status(400).json({ message: "Invalid product type" });
        }
    } catch (error) {
        // If an error occurs during decoding or processing, handle it here
        res.status(500).json({ message: error.message });
    }
};

exports.getProductId = async (req, res) => {
    try {
        // Extract the encoded string from the parameters
        const encodedParams = req.params.encodedParams;

        // Decode the encoded string using the decodeString function
        const decodedParams = decodeString(encodedParams);
        const productType = decodedParams.name;

        if (productType === "All Vehicles") {
            // Query all products from the database
            const allProducts = await ProductModel.find();

            // Extract unique product Models for the selected product
            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;
            const startingMeter = decodedParams.FromOdeaMeter;
            const endingMeter = decodedParams.ToOdeaMeter;
            const startingYear = decodedParams.FromYear;
            const endingYear = decodedParams.ToYear
            // Extract unique product Years excluding null values
            const uniqueProductId = [];
            for (const product of allProducts) {
                if (product.Make === selectedMake && product.Model === selectedModel && !uniqueProductId.includes(product._id)) {
                    if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                        if (product.Year >= startingYear || product.Year <= endingYear) {
                            
                            if(product.Location === decodedParams.Location){
                                uniqueProductId.push(product._id);
                          
                            }
                        }
                    }
                }
            }
            
            // Send the list of unique product Years in the response
            res.status(200).json(uniqueProductId);
            
        } else if (productType === "Salvage Vehicles") {
            // Query salvage vehicles with qualification "As-Is Condition (Major Repairs)"
            const salvageVehicles = await ProductModel.find({ qualification: "As-Is Condition (Major Repairs)" });

            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;
            const startingMeter = decodedParams.FromOdeaMeter;
            const endingMeter = decodedParams.ToOdeaMeter;
            const startingYear = decodedParams.FromYear;
            const endingYear = decodedParams.ToYear
            // Extract unique product Years excluding null values
            const uniqueProductId = [];
            for (const product of salvageVehicles) {
                if (product.Make === selectedMake && product.Model === selectedModel && !uniqueProductId.includes(product._id)) {
                    if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                        if (product.Year >= startingYear || product.Year <= endingYear) {
                           
                            if(product.Location === decodedParams.Location){
                                uniqueProductId.push(product._id);
                            }
                        }
                    }
                }
            }
            
            // Send the list of unique product Years in the response
            res.status(200).json(uniqueProductId);
            
        } else if (productType === "Used Vehicles") {
            // Query used vehicles with qualification not equal to "As-Is Condition (Major Repairs)"
            const usedVehicles = await ProductModel.find({ qualification: { $ne: "As-Is Condition (Major Repairs)" } });

            const selectedMake = decodedParams.SelectedMake;
            const selectedModel = decodedParams.Selected;
            const startingMeter = decodedParams.FromOdeaMeter;
            const endingMeter = decodedParams.ToOdeaMeter;
            const startingYear = decodedParams.FromYear;
            const endingYear = decodedParams.ToYear
            // Extract unique product Years excluding null values
            const uniqueProductId = [];
            for (const product of usedVehicles) {
                if (product.Make === selectedMake && product.Model === selectedModel && !uniqueProductId.includes(product._id)) {
                    if (product.OdoMeter >= startingMeter || product.OdoMeter <= endingMeter) {
                        if (product.Year >= startingYear || product.Year <= endingYear) {
                           
                            if(product.Location === decodedParams.Location){
                                uniqueProductId.push(product._id);
                            }
                        }
                    }
                }
            }
            
            // Send the list of unique product Years in the response
            res.status(200).json(uniqueProductId);
             
        } else {
            // If productType doesn't match any of the specified values, respond with an error
            res.status(400).json({ message: "Invalid product type" });
        }
    } catch (error) {
        // If an error occurs during decoding or processing, handle it here
        res.status(500).json({ message: error.message });
    }
};



exports.getProduct = async (req, res) => {
    try {
        // Extract the encoded string from the parameters
        const encodedParams = req.params.encodedParams;

        // Decode the encoded string using the decodeString function
        const decodedParams = decodeString(encodedParams);
        console.log(decodedParams);

        const productIds = Object.values(decodedParams); // Get an array of product IDs

        const products = [];

        for (const productId of productIds) {
            const product = await ProductModel.findById(productId);
            if (product) {
                products.push(product);
            }
        }

        res.status(200).json(products);
    } catch (error) {
        // If an error occurs during decoding or processing, handle it here
        res.status(500).json({ message: error.message });
    }
};



