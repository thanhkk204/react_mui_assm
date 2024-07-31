import Cart from "../models/Cart.js"
import Category from "../models/category.model.js"
import Checkout from "../models/Checkout.model.js"
import OrderedProduct from "../models/OrderedProduct.js"
// [GET]
export const GetAllCheckouts = async (req, res) =>{
  try {
    const checkouts = await Checkout.find({}).populate({
      path: 'orderedProducts',
      populate: {
        path: 'product_id',
        model: 'products'
      }
    })
    .exec();
    if(!checkouts) return res.status(400).json({ message: "Can't find any chekouts" }) 

    res.status(201).json({ checkouts: checkouts}) 

  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Lỗi server" })
  }
}

// [POST]
export const AddCheckOut = async (req, res) => {
    try {
        const { cartId, name, phone, address, orderedProducts } = req.body
        if(!req.body) return res.status(400).json({ message: "Body must be provided" })
    const orderedProductsIds = orderedProducts.map((item) => item._id)
    console.log("orderedProductsId", orderedProductsIds)
    const newCheckout = await Checkout.create({
      name,
      phone,
      address,
      orderedProducts: orderedProductsIds,
    })

    if (newCheckout) {
      await Cart.findByIdAndDelete(cartId)
    }
    res.status(201).json({ message: "Create your order successfully" })
  } catch (error) {
    res.status(400).json({ message: "Lỗi server" })
  }
}
