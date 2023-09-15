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
router.get(`/`, categoryController.getAllCategories);
router.get(`/:id`, categoryController.getCategoryById);
router.put(
  "/:id",
  uploadOptions.single("icon"),
  multerErrorHandling,
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);
export default router;
