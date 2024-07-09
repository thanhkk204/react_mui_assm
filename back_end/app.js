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
    await mongoose.connect("mongodb+srv://phamhoaithuong2106:IsyMTi6QegnagZLU@cluster0.nlinvnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to Mongoose!");
  } catch (error) {
    console.log("Can't connect to Mongoose");
  }
}

// set up home route
app.get("/", (req, res) => {});

// set up routes
import routerProduct from './routers/product.router.js'
import routerCategory from './routers/category.router.js'
import routerUser from './routers/user.router.js'
app.use('/product', routerProduct)
app.use('/category', routerCategory)
app.use('/auth', routerUser);

app.listen(port, (req, res) => {
  connectMongoose();
  console.log(`Our server is live on ${port}. Yay!`);
});
