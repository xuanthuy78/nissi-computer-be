import { Request, Response } from "express";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import Exception from "../../exceptions/Exception";
import { pathUpload } from "../../global/util";
import { brandsRepositories } from "../repositories";

const createBrand = async (req: Request, res: Response) => {
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
    const student = await brandsRepositories.createBread(
      req.body,
      fileName,
      basePath
    );
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create brand successfully",
      data: student,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot create brand:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

export default { createBrand };
