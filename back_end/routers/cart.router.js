import express from "express";
const router = express.Router();
import {
  getCate,
  getCateById,
  insertCate,
  updateCate,
  removeCate,
} from "../controllers/category.cotrollor.js";
import { addProductToCart, deleteProductFromCart, getCateByUserId, updateProductQuantityInCart } from "../controllers/cart.controller.js";

router.get("/:id", getCateByUserId);
router.post("/", addProductToCart);
router.put("/", updateProductQuantityInCart);
router.delete("/:id", deleteProductFromCart);

export default router;
