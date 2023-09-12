import express from "express";
import { brandController } from "../app/controllers";
const router = express.Router();

router.post("/", brandController.createBrand);

export default router;
