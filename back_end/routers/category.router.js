import express from "express";
const router = express.Router();
import {
  getCate,
  getCateById,
  insertCate,
  updateCate,
  removeCate,
} from "../controllers/category.cotrollor.js";

router.get("/", getCate);
router.get("/:id", getCateById);
router.post("/", insertCate);
router.put("/:id", updateCate);
router.delete("/:id", removeCate);

export default router;
