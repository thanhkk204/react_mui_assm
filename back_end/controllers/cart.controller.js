import Cart from "../models/Cart.js";
import Category from "../models/category.model.js";
import OrderedProduct from "../models/OrderedProduct.js";
// [GET]
export function getCate(req, res) {
  Category.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({ message: "Có lỗi khi lấy dữ liệu" });
    });
}

// [GET]:id
export async function getCateByUserId(req, res) {
  let id = req.params.id;
  
  try {
    if(!id) return res.status(400).json({ message: "Không nhận được id" });
      const cart = await Cart.findOne({userId: id}).populate({
        path: 'orderedProduct',
        populate: {
          path: 'product_id',
          model: 'products'
        }
      })
      .exec();
  
      if (!cart) {
       return  res.status(400).json({ message: "Không có cart" });
      }
        
        res.status(200).json({cart: cart});
      } catch (error) {
        console.log('err', error)
        
        res.status(400).json({ message: "Lỗi server" });
  }
}

// [POST]
export const addProductToCart = async (req, res) => {
    let userId = req.body.userId
    let cartId = req.body.cartId;
    const orderedDetails = req.body.orderedDetails;
    try {
       
    const existingCart = await Cart.findOne({userId: userId})
    if(!existingCart){
        const newCart = await Cart.create({userId: userId})
        cartId = newCart._id
    }
      
    let existedCart = await Cart.findById(cartId).populate('orderedProduct');

    // console.log(existedCart)
    // console.log(existedCart.orderedProduct)
     const orderedPro = existedCart.orderedProduct.find( item => item.product_id.toString() === orderedDetails.product_id)
     console.log(orderedPro)
     if(orderedPro) {
      await OrderedProduct.findByIdAndUpdate(orderedPro._id, {quantity: orderedPro.quantity + orderedDetails.quantity}, {new: true})
      const newCart = await Cart.findById(cartId).populate({
        path: 'orderedProduct',
        populate: {
          path: 'product_id',
          model: 'products'
        }
      })
      .exec();
      return res.status(200).json({cart: newCart});
     }
      // Tạo một orderedProduct mới
      const orderedProduct = new OrderedProduct(orderedDetails);
      await orderedProduct.save();
      // Thêm orderedProduct vào cart
      const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        { $addToSet: { orderedProduct: orderedProduct._id } },
        { new: true, useFindAndModify: false }
      ).populate({
        path: 'orderedProduct',
        populate: {
          path: 'product_id',
          model: 'products'
        }
      })
      .exec();
  
      res.status(200).json({cart: updatedCart});
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

// [PUT]
export const updateProductQuantityInCart = async (req, res) => {
  const cartId = req.body.cartId
  const orderedDetails = req.body.orderedDetails;
  try {
    // Tìm Cart bằng cartId
    const cart = await Cart.findById(cartId).populate('orderedProduct');

    if (!cart) {
      console.error('Cart not found');
      return;
    }

    // Tìm OrderedProduct trong mảng orderedProduct của Cart
    const orderedProduct = cart.orderedProduct.find(product => product._id.toString() === orderedDetails._id);

    if (!orderedProduct) {
      console.error('OrderedProduct not found in Cart');
      return;
    }
    // Cập nhật số lượng của OrderedProduct
    orderedProduct.quantity = orderedDetails.quantity;

    // Lưu OrderedProduct đã cập nhật
    await orderedProduct.save();

    // Populate orderedProduct để lấy thông tin chi tiết của sản phẩm
    const newCart = await Cart.findById(cartId).populate({
      path: 'orderedProduct',
      populate: {
        path: 'product_id',
        model: 'products'
      }
    })
    .exec();
    return res.status(200).json({cart: newCart});
  } catch (error) {
    console.error('Error updating product quantity in cart:', error);
  }
};


// [DELETE]
export const deleteProductFromCart = async (req, res) => {
  const productId = req.params.id
  try {
    // Tìm Cart chứa OrderedProduct với productId
    const cart = await Cart.findOne({ orderedProduct: productId });

    if (!cart) {
      console.error('Cart not found');
      return;
    }

    // Loại bỏ OrderedProduct khỏi mảng orderedProduct
    cart.orderedProduct = cart.orderedProduct.filter(id => id.toString() !== productId);

    await cart.save();

    // Xóa OrderedProduct từ cơ sở dữ liệu
    await OrderedProduct.findByIdAndDelete(productId);

    // Populate orderedProduct để lấy thông tin chi tiết của sản phẩm
     const newCart = await Cart.findById(cart._id).populate({
      path: 'orderedProduct',
      populate: {
        path: 'product_id',
        model: 'products'
      }
    })
    .exec();
    return res.status(200).json({cart: newCart});

  
  } catch (error) {
    console.error('Error deleting product from cart:', error);
  }
};
