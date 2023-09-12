import { categoryController } from "../app/controllers";
import { multerErrorHandling, uploadOptions } from "../global/util";
import express from "express";

const router = express.Router();

router.post(
  "/",
  uploadOptions.single("icon"),
  multerErrorHandling,
  categoryController.createCategory
);

export default router;
