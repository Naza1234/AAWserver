const mongoose = require('mongoose');

const ContactUsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    SubjectOfInquiry: {
        type: String,
        required: false
    },
    MessageTo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const ContactUsModel = mongoose.model('ContactUs', ContactUsSchema);

module.exports = ContactUsModel;
