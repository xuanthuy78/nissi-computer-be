import express from "express";
import { productController } from "../app/controllers";
const router = express.Router();

router.post("/", productController.createProducts);

export default router;
