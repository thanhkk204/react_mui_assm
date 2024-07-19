import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

// [GET] /product/category/:id
export function getProductByCateId(req, res) {
  const cateId = req.params.id;
  if (cateId) {
    Product.find({ category: cateId })
      .populate("categoryId")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({ message: "Không tìm thấy sản phẩm" });
      });
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}
// [GET] /product/:id
export function getById(req, res) {
  let id = req.params.id;
  if (id) {
    Product.findById(id).populate('categoryId')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
       res.status(400).json({erorr: err, message: "Không tìm thấy sản phẩm" });
      });
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}

// [GET] /product
export function getAll(req, res) {
  Product.find().populate('categoryId')
  .then((data) => {
    res.status(200).json(data);
    // console.log(data)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ message: "Có lỗi khi lấy dữ liệu" });
  });
}
//[POST] /product
export function insert(req, res) {
  const product = req.body;
  console.log('product', product)
  if (product != {}) {
    Product.create(product)
      .then((data) => {
        res.status(201).json(data);
        // console.log('succesfully')
      })
      .catch((err) => {
        // console.log(err)
        res.status(500).json({ message: "Có lỗi khi thêm sản phẩm" });
      });
  } else {
    res.status(400).json({ message: "Không nhận dược dữ liệu" });
  }
}
//[PUT] /product/:id
export function update(req, res) {
  const id = req.params.id;
  if (id) {
    const productData = req.body;
    if (productData != {}) {
      Product.findByIdAndUpdate(id, productData, { new: true })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(400).json({ message: "có lỗi khi sửa" });
        });
    } else {
      res.status(500).json({ message: "Không nhận được dữ liệu" });
    }
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}
//[DELETE] /product/:id
export function remove(req, res) {
  const id = req.params.id;
  if (id) {
    Product.findByIdAndDelete(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({
          message: "Có lỗi khi xóa",
        });
      });
  } else {
    res.status(400).json({
      message: "Không nhận được id",
    });
  }
}
