
const userIdCards = require('../models/userDataId');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Create a new product image
exports.adduserIdCardImage = async (req, res) => {
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
    const newuserIdCardImage = await userIdCardsImage.create(data);
    res.status(201).json(newuserIdCardImage);
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


