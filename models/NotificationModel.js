const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    notificationMessage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        required: true,
        default: false
    },
},
{
    timestamps: true
});

const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel;
