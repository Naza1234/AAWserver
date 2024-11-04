const Auction = require('../models/auctionModel');
const AuctionWinner = require('../models/auctionWinnerModel');
const CarDetails = require('../models/CarDetailsModel');
const Conversation = require('../models/conversation.model');
const GarageDetails = require('../models/GarageDetailsModel');
const Notification = require('../models/NotificationModel');
const Payment = require('../models/paymentModel');
const Product = require('../models/ProductModel');
const ProductsImage = require('../models/productImageModel');
const User = require('../models/UserModel');
const Withdrawal = require('../models/WithdrawalModel');
const ProductImage = require('../models/productImageModel'); // Update the path to the ProductImage model
const CarDetailsModel = require('../models/CarDetailsModel'); // Update the path to CarDetailsModel
const GarageDetailsModel = require('../models/GarageDetailsModel'); // Update the path to GarageDetailsModel






exports.EndAuction = async (req, res) => {
  try {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    const products = await Product.find({});
    deleteDuplicateCoverImages();
    deleteDuplicateCarDetails();
    deleteDuplicateGarageDetails();
    for (const iterator of products) {
      if (formattedDateTime > iterator.endDateTime && iterator.Category === "Auction Product") {
        // Find the latest auction entry
        const auction = await Auction.findOne({ productId: iterator._id }).sort({ _id: -1 }).limit(1);

        if (auction) {
          const updateParams = {
            Price: auction.amount,
            productSold: true,
          };

          const updatedProduct = await Product.findByIdAndUpdate(iterator._id, updateParams, { new: true });
          // console.log('Product updated:', updatedProduct);

          const auctionWinnerParams = {
            userId: auction.userId,
            productId: auction.productId,
          };

          // Check if the auction winner already exists
          const existingAuctionWinner = await AuctionWinner.findOne(auctionWinnerParams);
          if (!existingAuctionWinner) {
            const auctionWinner = await AuctionWinner.create(auctionWinnerParams);
            // console.log('Auction winner created:', auctionWinner);
          } else {
            // console.log('Auction winner already exists. Skipping creation.');
          }

          const notificationParams = {
            userId: auction.userId,
            productID: auction.productId,
            notificationMessage: `We are pleased to inform you that you have emerged as the rightful winner of the ${iterator.productName} auction. Kindly proceed to your Winner's page to initiate the process for acquiring the car.`,
            title: "Congratulations on Winning the Car Auction",
          };

          // Check if the notification already exists
          const existingNotification = await Notification.findOne({
            userId: notificationParams.userId,
            productID: notificationParams.productID,
          });
          if (!existingNotification) {
            const newNotification = await Notification.create(notificationParams);
            // console.log('Notification sent:', newNotification);
          } else {
            // console.log('Notification already sent. Skipping.');
          }
        } else {
          // console.log(`No auction found for product ${iterator._id}.`);
        }
      }
    }


    res.status(200).json({ message: "Auction process completed successfully." });

  } catch (error) {
    console.error('Error in EndAuction:', error);
    res.status(500).json({ message: "An error occurred during the auction process.", error: error.message });
  }
};




async function deleteDuplicateCoverImages() {
  try {
    // Find all products with duplicate cover images
    const images = await ProductImage.aggregate([
      {
        $group: {
          _id: { productId: "$productId", imageUrl: "$imageUrl" },
          duplicates: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    // Loop through each set of duplicates
    for (const image of images) {
      const [keepImage, ...duplicates] = image.duplicates; // Keep the first image, delete the rest

      // Delete the duplicates
      await ProductImage.deleteMany({ _id: { $in: duplicates } });
    }

    console.log("Duplicate cover images deleted successfully.");
  } catch (error) {
    console.error("Error deleting duplicate cover images:", error);
  }
}

// Run the function


async function deleteDuplicateCarDetails() {
  try {
    // Find duplicates based on `productId` and `detailTitle`
    const duplicates = await CarDetailsModel.aggregate([
      {
        $group: {
          _id: { productId: "$productId", detailTitle: "$detailTitle" },
          duplicates: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 } // Only return groups with duplicates
        }
      }
    ]);

    // Loop through each duplicate set
    for (const item of duplicates) {
      const [keepDetail, ...toDelete] = item.duplicates; // Keep the first, delete the rest

      // Delete duplicates
      await CarDetailsModel.deleteMany({ _id: { $in: toDelete } });
    }

    console.log("Duplicate car details deleted successfully.");
  } catch (error) {
    console.error("Error deleting duplicate car details:", error);
  }
}

// Run the function


async function deleteDuplicateGarageDetails() {
  try {
    // Find duplicates based on `productId` and `detailTitle`
    const duplicates = await GarageDetailsModel.aggregate([
      {
        $group: {
          _id: { productId: "$productId", detailTitle: "$detailTitle" },
          duplicates: { $push: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 } // Only return groups with duplicates
        }
      }
    ]);

    // Loop through each duplicate set
    for (const item of duplicates) {
      const [keepDetail, ...toDelete] = item.duplicates; // Keep the first, delete the rest

      // Delete duplicates
      await GarageDetailsModel.deleteMany({ _id: { $in: toDelete } });
    }

    console.log("Duplicate garage details deleted successfully.");
  } catch (error) {
    console.error("Error deleting duplicate garage details:", error);
  }
}

// Run the function

