import express from "express";
import { productController } from "../app/controllers";
const router = express.Router();

router.post("/edit", productController.getAllProducts);

export default router;
