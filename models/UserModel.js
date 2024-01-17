const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true
    },
    UserMobile: {
        type: String,
        required: true
    },
    UserLocation: {
        type: String,
        required: true
    },
    UserProfileImage: {
        type: String, // Assuming a file path or URL for the profile image
        required: false // You may change this to true if a profile image is required
    },
    UserPassword: {
        type: String,
        required: true
    },
    UserIsAdmin: {
        type: Boolean,
        required: true,
        default:false
    },
    UserPaymentStatues: {
        type: String,
        required: true,
        default:"free"
    },
    UserAccountBalance: {
        type: Number,
        required: true,
        default: 0 // You may set a default value
    },
    UserWithdrawalAmount: {
        type: Number,
        required: true,
        default: 0 // You may set a default value
    },
},
{
    timestamps: true
});

// Create a pre-save middleware to hash the password
UserSchema.pre('save', async function(next) {
    try {
        // Check if the password has been modified, if not, skip hashing
        if (!this.isModified('UserPassword')) {
            return next();
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.UserPassword, salt);
        this.UserPassword = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.pre('findOneAndUpdate', async function(next) {
    try {
      // Check if the UserPassword field is present in the update data
      if (this._update.UserPassword) {
        // Generate a salt and hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this._update.UserPassword, salt);
        this._update.UserPassword = hashedPassword;
      }
  
      next();
    } catch (error) {
      return next(error);
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
