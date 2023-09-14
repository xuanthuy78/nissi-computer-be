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

router.get(`/`, brandController.getAllBrands);
router.get(`/:id`, brandController.getBrandById);
// router.put(
//   "/:id",
//   uploadOptions.fields([
//     {
//       name: "productImage",
//       maxCount: 1,
//     },
//     {
//       name: "imageCollection",
//       maxCount: 10,
//     },
//   ]),
//   multerErrorHandling,
//   productController.updateProduct
// );
// router.delete("/:id", productController.deleteProduct);

export default router;
