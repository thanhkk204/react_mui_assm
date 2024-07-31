import express from "express";
import { AddCheckOut, GetAllCheckouts } from "../controllers/checkout.js";
const router = express.Router();

router.get("/", GetAllCheckouts);
router.post("/", AddCheckOut);

export default router;