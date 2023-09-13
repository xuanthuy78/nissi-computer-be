import express from "express";
import { productController } from "../app/controllers";
import { multerErrorHandling, uploadOptions } from "../global/util";
const router = express.Router();

router.post(
  "/",
  uploadOptions.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
    {
      name: "imageCollection",
      maxCount: 10,
    },
  ]),
  multerErrorHandling,
  productController.createProducts
);

export default router;
