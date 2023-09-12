import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import { categoryController } from "../app/controllers";
import { uploadOptions } from "../global/util/uploadImages";
import HttpStatusCode from "../exceptions/HttpStatusCode";

const multerErrorHandling = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.toString(),
    });
  }
};
const router = express.Router();

router.post(
  "/",
  uploadOptions.single("icon"),
  multerErrorHandling,
  categoryController.createCategory
);

export default router;
