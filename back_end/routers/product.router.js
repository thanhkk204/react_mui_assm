import express from "express";
const router = express.Router();
import {
  getById,
  insert,
  update,
  remove,
  getProductByCateId,
} from "../controllers/product.controller.js";

router.get("/:id", getById);
router.post("/", insert);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/category/:id", getProductByCateId);

export default router;
