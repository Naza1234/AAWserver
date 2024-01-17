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










exports.EndAuction = async (req, res) => {





const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');
    
const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    
const products = await Product.find({});
    

for (const iterator of products) {



       if(formattedDateTime > iterator.endDateTime && iterator.category === "auction product "){


        const auction = await Auction.findOne({ productId: iterator._id }).sort({ _id: -1 }).limit(1);



        const UpDateParams={
            price:auction.amount,
            productSold:true,
        }
         

        const updatedProduct = await Product.findByIdAndUpdate(iterator._id, UpDateParams, { new: true });


           

        const AuctionWinnerParams={
            userId: auction.userId,
            productId: auction.productId,
        }



        const auctionWinner = await AuctionWinner.create(AuctionWinnerParams);



        const NotificationParams={

            userId:auction.userId,
            notificationMessage:`
            We are pleased to inform you that you have emerged as the rightful winner of the ${iterator.productName} auction. Kindly proceed to your Winner's page to initiate the process for acquiring the car
            `,
            title: "Congratulations on Winning the Car Auction",
  
        }




        const newNotification = await Notification.create(NotificationParams);



       }

console.log("it is working");

}
   

};