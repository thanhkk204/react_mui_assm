import mongoose from "mongoose";

function validateEmail(textEmail) {
  return /^\S+@\S+\.\S+$/.test(textEmail);
}
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Không được để trống Name"],
      lowercase: true,
      trim: true,
      minLength: [3, "Cần nhập tối thiểu 3 ký tự"],
      maxLength: [10, "Cần nhập tối đa 10 ký tự"],
    },
    email: {
      type: String,
      unique: [true, "Email đã tồn tại"],
      validate: {
        validator: validateEmail,
        message: "Email không hợp lệ",
      },
    },
    password: {
      type: String,
      required: [true, "Không được để trống password"],
      minLength: [6, "Cần nhập tối thiểu 6 ký tự"],
    },
    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
