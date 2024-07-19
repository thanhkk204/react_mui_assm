import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// [GET]
export function getUser(req, res) {
  User.find()
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.json({ message: "Có lỗi khi lấy dữ liệu" });
    });
}

// [GET]:id
export function getUserById(req, res) {
  let id = req.params.id;
  if (id) {
    User.findById(id)
      .then((data) => {
        res.json(data);
      })
      .catch(() => {
        res.json({ message: "Không tìm thấy User" });
      });
  } else {
    res.json({ message: "Không nhận được id" });
  }
}

// [POST] user/signup
export async function signup(req, res) {
  console.log('ttt');
  try {
    const data = req.body;
    if(!data.username || !data.password || !data.email) return res.status(400).json({ message: "Cần điền đầy đủ thông tin" });
    const userExist = await User.findOne({ email: data.email });
    console.log(data)
    if (userExist) return res.status(400).json({ message: "Email đã tồn tại" });
    if (data.password && data.password != "") {
      if (data.password.length < 6) {
        return res
          .status(400)
          .json({ message: "Mật khẩu phải có ít nhất 6 ký tự" });
      }
      const hashPassword = await bcryptjs.hash(data.password, 10);
      data.password = hashPassword;
    }
    const userSuccess = await User.create(data);
    if (userSuccess) {
      userSuccess.password = undefined;
      res.status(201).json({
        message: "Thêm tài khoản thành công",
        data: userSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// [POST] user/signin
export async function signin(req, res) {
  const data = req.body;
  console.log('body', data)
  const userExist = await User.findOne({ email: data.email });
  console.log(userExist);
  if (!userExist) return res.status(400).json({ message: "Sai tài khoản" });
  const isCheck = await bcryptjs.compare(data.password, userExist.password);
  if (!isCheck) return res.status(400).json({ message: "Sai mật khẩu" });
  const token = jwt.sign(
    { name: userExist.name, username: userExist.email },
    process.env.KEY_SECRET,
    { expiresIn: "2h" }
  );
  console.log(token);

  if (token) {
    userExist.password = undefined;
    res.status(200).json({
      message: "Đăng nhập thành công",
      token: token,
      data: userExist,
      token,
    });
  }
}

// [PUT]
export function updateUser(req, res) {
  const id = req.params.id;
  if (id) {
    const userData = req.body;
    if (userData != {}) {
      User.findByIdAndUpdate(id, userData, { new: true })
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
export function removeUser(req, res) {
  const id = req.params.id;
  if (id) {
    User.findByIdAndDelete(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json({ message: "Có lỗi khi xóa" });
      });
  } else {
    res.status(400).json({ message: "Không nhận được id" });
  }
}
