import { Request, Response } from "express";
import { categoriesRepositories } from "../repositories";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import Exception from "../../exceptions/Exception";
import { pathUpload } from "../../global/util";

const createCategory = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      const error: { message: string; validationErrors: any } = new Exception(
        "Input error",
        "Please upload a file"
      );
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.validationErrors,
      });
    }
    const fileName = file?.filename;
    const basePath = pathUpload(req);
    const category = await categoriesRepositories.createCategory(
      req.body,
      fileName,
      basePath
    );
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create category successfully",
      data: category,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot create cateogry:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

export default { createCategory };
