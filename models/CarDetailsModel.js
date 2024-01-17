const mongoose = require('mongoose');

const CarDetailsSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    detailTitle: {
        type: String,
        required: true
    },
    detailsInformation: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const CarDetailsModel = mongoose.model('CarDetails', CarDetailsSchema);

module.exports = CarDetailsModel;
