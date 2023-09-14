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
router.put(
  "/:id",
  uploadOptions.single("image"),
  multerErrorHandling,
  brandController.updateBrand
);
// router.delete("/:id", productController.deleteProduct);

export default router;
