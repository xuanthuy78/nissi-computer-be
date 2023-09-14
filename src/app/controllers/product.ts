import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import Exception from "../../exceptions/Exception";
import { isEmpty } from "lodash";
import { pathUpload } from "../../global/util";
import { productsRepositories } from "../repositories";
import { MAX_RECORDS, paginationTypes } from "../../global/common";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let {
    page = "1",
    size = MAX_RECORDS,
    searchString = "",
  }: paginationTypes = req.query as paginationTypes;

  size = size >= MAX_RECORDS ? MAX_RECORDS : size;

  try {
    let filteredProducts = await productsRepositories.getAllProducts({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Get products successfully",
      size: filteredProducts.length,
      page,
      searchString,
      data: filteredProducts,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const createProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files: any = req.files;
    if (isEmpty(files)) {
      const error: { message: string; validationErrors: any } =
        await new Exception("Input error", "Please upload a file");
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.validationErrors,
      });
    }

    let imageCollection = [];
    const fileName = files?.productImage[0]?.filename;
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
    if (exception?.validationErrors?.code == 11000) {
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

export default { createProducts, getAllProducts };
