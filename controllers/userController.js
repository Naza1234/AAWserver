const User = require('../models/UserModel');
const multer =require('multer')
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');


// Create a new user
exports.createUser = async (req, res) => {
  try {
      const { UserEmail} = req.body;
      // Check if the  UserEmail already exists in the database
      const existingUser = await User.findOne({  UserEmail });
    
      if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use' });
      }            
    const image=req.files
    const imagePath = `./image/${image[0].filename}`;
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Convert the image buffer to a data URI
    const dataURI = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    const userData = {
      UserName:req.body.name,
      UserEmail:req.body. UserEmail,
      UserMobile:req.body.mobile,
      UserLocation:req.body.location,
      UserProfileImage:dataURI,
      UserPassword:req.body.password,
    }
    const newUser = await User.create(userData);
    res.status(201).json(newUser);
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
exports.login = async (req, res) => {
  try {
      const {  UserEmail , password } = req.body;
      // Find the user by  UserEmail
      const user = await User.findOne ({  UserEmail });
       
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.UserPassword);

      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid password' });
      }

      // Return the user's _id if login is successful
      res.status(201).json(user._id);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Read all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a single user by ID
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single user by ID
exports.updateSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.ChangeUserPasswordByOldPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const {  OldPassword , NewPassword } = req.body;
       
     

      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(OldPassword , user.UserPassword);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
      
    const params={
      UserPassword:NewPassword
    }
    const updatedUser = await User.findByIdAndUpdate(id, params, { new: true });
    
    res.status(200).json({message:"password change successful"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a single user by ID
exports.deleteSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
