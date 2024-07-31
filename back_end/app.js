import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
// set up port number
const port = 5000;

app.use(express.json());
app.use(cors());

async function connectMongoose() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/react_mui_2");
    console.log("Connected to Mongoose!");
  } catch (error) {
    console.log(error)
    console.log("Can't connect to Mongoose");
  }
}

// set up home route
app.get("/", (req, res) => {});

// set up routes
import routerProduct from './routers/product.router.js'
import routerCategory from './routers/category.router.js'
import routerUser from './routers/user.router.js'
import cartRouter from './routers/cart.router.js'
import checoutRouter from './routers/checkout.route.js'
app.use('/product', routerProduct)
app.use('/category', routerCategory)
app.use('/auth', routerUser);
app.use('/cart', cartRouter);
app.use('/checkout', checoutRouter);

app.listen(port, (req, res) => {
  connectMongoose();
  console.log(`Our server is live on ${port}. Yay!`);
});
