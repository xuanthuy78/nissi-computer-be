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
router.get(`/`, productController.getAllProducts);
router.get(`/:id`, productController.getProductById);
router.put(
  "/:id",
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
router.delete("/:id", productController.deleteProduct);
export default router;
