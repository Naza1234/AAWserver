const mongoose = require('mongoose');

const WithdrawalSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    Processed: {
        type: Boolean,
        required: true,
        default:false,
    },
    Declied: {
        type: Boolean,
        required: true,
        default:false,
    },
},
{
    timestamps: true
});

const WithdrawalModel = mongoose.model('Withdrawal', WithdrawalSchema);

module.exports = WithdrawalModel;
