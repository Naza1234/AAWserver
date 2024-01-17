const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: 'http://autoauction.space',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/image", express.static("./image"));

// Import all routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');
const productImageRoutes = require('./routes/productsImageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const carDetailsRoutes = require('./routes/carDetailsRoutes');
const garageDetailsRoutes = require('./routes/garageDetailsRoutes');
const conversationRoute = require('./routes/conversation.route');
const auctionWinnerRoute = require("./routes/auctionWinnerRoutes");
const endAuctionRoutes = require('./routes/endAuctionRoutes');


// Use the routes
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/auction", auctionRoutes);
app.use("/payments", paymentRoutes);
app.use("/withdrawal", withdrawalRoutes);
app.use("/productImage", productImageRoutes);
app.use("/notifications", notificationRoutes);
app.use("/car-details", carDetailsRoutes);
app.use("/garage-details", garageDetailsRoutes);
app.use('/conversations', conversationRoute);
app.use("/auctionWinner", auctionWinnerRoute);
app.use("/endAuction", endAuctionRoutes);


// Database connection
const url = "mongodb+srv://autoauctionwebsite:autoauctionwebsitedatabase@cluster0.9u9dp11.mongodb.net/?retryWrites=true&w=majority";
const port = 3000;
// autoauctionwebsitedatabase
// autoauctionwebsite
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to the database');
    app.use("/",(req,res)=>{
        res.end('origin')
      })
    app.listen(port, () => {
      console.log(`Server is now running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });