import Category from "../models/category.model.js";
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
export function getCateById(req, res) {
  let id = req.params.id;
  if (id) {
    Category.findById(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json({ message: "Không tìm thấy danh mục" });
      });
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}

// [POST]
export function insertCate(req, res) {
  const category = req.body;
  if (category != {}) {
    Category.create(category)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json({ message: "Có lỗi khi thêm danh mục" });
      });
  } else {
    res.status(400).json({ message: "Không nhận được dữ liệu" });
  }
}

// [PUT]
export function updateCate(req, res) {
  const id = req.params.id;
  if (id) {
    const categoryData = req.body;
    if (categoryData != {}) {
      Category.findByIdAndUpdate(id, categoryData, { new: true })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(400).json({ message: "Có lỗi khi sửa" });
        });
    } else {
      res.status(500).json({ message: "Không nhận được dữ liệu" });
    }
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}

// [DELETE]
export function removeCate(req, res) {
  const id = req.params.id;
  if(id){
    Category.findByIdAndDelete(id).then((data)=>{
      res.status(200).json(data)
    }).catch(()=>{
      res.status(400).json({
        message: "Có lỗi khi xóa"
      })
    })
  }else{
    res.status(400).json({
      message: "Không nhận được id"
    })
  }
}
