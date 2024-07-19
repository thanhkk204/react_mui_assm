import express from "express";
const router = express.Router();
import {
  getUser,
  getUserById,
  signup,
  removeUser,
  updateUser,
  signin,
} from "../controllers/user.controller.js";

// router.get("/", getUser);
// router.get("/:id", getUserById);
router.post("/signup", signup);
router.post("/signin", signin);
// router.put("/:id", updateUser);
// router.delete("/:id", removeUser);

export default router;
