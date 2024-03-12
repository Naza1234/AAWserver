const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    Make: {
        type: String,
        required: true
    },
    Model: {    
        type:String,
        required: true
    },
    OdoMeter: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Qualification: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
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
