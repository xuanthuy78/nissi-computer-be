import express from "express";
import { productController } from "../app/controllers";
import { multerErrorHandling, uploadOptions } from "../global/util";
import authJwt from "../helpers/jwt";
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
  authJwt,
  multerErrorHandling,
  productController.createProducts
);
router.get(`/`, productController.getAllProducts);
router.get(`/:id`, productController.getProductById);
router.put(
  "/:id",
  authJwt,
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
  productController.updateProduct
);
router.delete("/:id", authJwt, productController.deleteProduct);

export default router;
