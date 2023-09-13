import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import Exception from "../../exceptions/Exception";
import { isEmpty } from "lodash";
import { pathUpload } from "../../global/util";
import { productsRepositories } from "../repositories";

const createProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files: any = req.files;
    let imageCollection = [];
    const fileName = files?.productImage[0]?.filename;

    if (isEmpty(files)) {
      const error: { message: string; validationErrors: any } = new Exception(
        "Input error",
        "Please upload a file"
      );
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.validationErrors,
      });
    }

    const basePath = pathUpload(req);

    if (files?.imageCollection) {
      imageCollection = files.imageCollection.map(
        (file: Express.Multer.File) => `${basePath}${file.filename}`
      );
    }

    const product = await productsRepositories.createProduct(
      req.body,
      fileName,
      basePath,
      imageCollection
    );

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create product successfully",
      data: product,
    });
  } catch (exception: any) {
    if (exception.validationErrors.code == 11000) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Cannot product product:" + exception,
        validationErrors: `${exception?.validationErrors?.keyValue?.productName} that already existed`,
      });
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Cannot create product:" + exception,
        validationErrors: exception.validationErrors,
      });
    }
  }
};

export default { createProducts };
