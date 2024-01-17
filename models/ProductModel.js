const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingDateTime: {
        type: String, // You can change the type based on your specific needs
        required: true
    },
    endDateTime: {
        type: String, // You can change the type based on your specific needs
        required: true
    },
    productApproved: {
        type: Boolean, // You can change the type based on your specific needs
        required: true,
        default:false
    },
    productSold:{
        type: Boolean, // You can change the type based on your specific needs
        required: true,
        default:false 
    },
    productUserApproved:{
        type: Boolean, // You can change the type based on your specific needs
        required: true,
        default:false 
    },
},
{
    timestamps: true
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
