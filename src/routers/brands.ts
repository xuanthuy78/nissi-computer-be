import express from "express";
import { brandController } from "../app/controllers";
import { multerErrorHandling, uploadOptions } from "../global/util";
const router = express.Router();

router.post(
  "/",
  uploadOptions.single("image"),
  multerErrorHandling,
  brandController.createBrand
);

export default router;
