const ProductsImage = require('../models/productImageModel');
const Products = require('../models/ProductModel');
const AuctionWinner = require('../models/auctionWinnerModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ProductImage = require('../models/productImageModel');

// Create a new product image
exports.addProductImage = async (req, res) => {
  try {
    const image=req.files
    const imagePath = `./image/${image[0].filename}`;
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    // Convert the image buffer to a data URI
    const dataURI = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    
    const data = {
      productId: req.body.productId,
      imageUrl: dataURI,
    };
    const newProductImage = await ProductsImage.create(data);
    res.status(201).json(newProductImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};
const fileStorage=multer.diskStorage({
  destination: (req,file,cd) =>{
      cd(null,'image')
  },
  filename: (req, file, cd)=>{
      cd(null,Date.now() + path.extname(file.originalname))
  }
})
exports.upload=multer({
  storage:fileStorage,
   limits:{fileSize: '10000000'},
  fileFilter: (req, file, callback) => {
      const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
      if (!(acceptableExtensions.some(extension => 
          path.extname(file.originalname).toLowerCase() === `.${extension}`)
      )) {
          return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
      }
      callback(null, true)
  }
}).any()
// Read all product images



exports.getWonProductsImg = async (req, res) => {
  try {
    const { id } = req.params;
    const auctionWinners = await AuctionWinner.find({userId:id});
    const ProductsImg=[]
    for (const iterator of auctionWinners) {
      const productImg = await ProductImage.findOne({productId:iterator.productId});
      ProductsImg.push(productImg)
    }
    res.status(200).json(ProductsImg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getAllProductImagesWithUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const productImages=[]
    const UserProduct = await Products.find({});
    for (const iterator of UserProduct) {
      const productImage = await ProductsImage.findOne({productId:iterator._id});
       productImages.push(productImage) 
    }
    res.status(200).json(productImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProductImages = async (req, res) => {
  try {
    const productImages = await ProductsImage.find({});
    res.status(200).json(productImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a single product image by ID
exports.getSingleProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const productImage = await ProductsImage.findOne({ productId: id });
  
    if (!productImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
  
    res.status(200).json(productImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};

// Update a single product image by ID
exports.updateSingleProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductImage = await ProductsImage.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProductImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    res.status(200).json(updatedProductImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a single product image by ID
exports.deleteSingleProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProductImage = await ProductsImage.findByIdAndDelete(id);
    if (!deletedProductImage) {
      return res.status(404).json({ message: 'Product image not found' });
    }
    res.status(200).json(deletedProductImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
