import { Request, Response } from "express";
import { categoriesRepositories } from "../repositories";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import Exception from "../../exceptions/Exception";
import { pathUpload } from "../../global/util";
import { MAX_RECORDS, paginationTypes } from "../../global/common";

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
const getAllCategories = async (req: Request, res: Response) => {
  let {
    page = "1",
    size = MAX_RECORDS,
    search = "",
  }: paginationTypes = req.query as paginationTypes;

  size = size >= MAX_RECORDS ? MAX_RECORDS : size;

  try {
    let filteredCategories = await categoriesRepositories.getAllCategories({
      size,
      page,
      search,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Get categories successfully",
      size: filteredCategories.length,
      page,
      search,
      data: filteredCategories,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  try {
    const category = await categoriesRepositories.getCategoryById(categoryId);
    if (category) {
      res.status(HttpStatusCode.OK).json({
        message: "Get detail category successfully",
        data: category,
      });
    } else {
      res.status(HttpStatusCode.OK).json({
        message: `Deleted category ${categoryId}`,
      });
    }
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const categoryId = req.params.id;
    if (!file || req.body.icon) {
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
    const category = await categoriesRepositories.updateCategory(
      req.body,
      fileName,
      basePath,
      categoryId
    );
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create category successfully",
      data: category,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot create category:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req?.params?.id;
  try {
    const category = await categoriesRepositories.deleteCategorById(categoryId);
    if (category) {
      res.status(HttpStatusCode.OK).json({
        message: "Delete category successfully",
        data: { id: category?._id },
      });
    } else {
      res.status(HttpStatusCode.OK).json({
        message: `Deleted category ${categoryId}`,
      });
    }
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};
export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
