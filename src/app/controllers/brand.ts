import { Request, Response } from "express";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import Exception from "../../exceptions/Exception";
import { pathUpload } from "../../global/util";
import { brandsRepositories } from "../repositories";
import { MAX_RECORDS, paginationTypes } from "../../global/common";

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
    const brand = await brandsRepositories.createBread(
      req.body,
      fileName,
      basePath
    );
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create brand successfully",
      data: brand,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot create brand:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

const getAllBrands = async (req: Request, res: Response) => {
  let {
    page = "1",
    size = MAX_RECORDS,
    search = "",
  }: paginationTypes = req.query as paginationTypes;

  size = size >= MAX_RECORDS ? MAX_RECORDS : size;

  try {
    let filteredBrands = await brandsRepositories.getAllBrands({
      size,
      page,
      search,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Get brands successfully",
      size: filteredBrands.length,
      page,
      search,
      data: filteredBrands,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const getBrandById = async (req: Request, res: Response) => {
  const brandId = req.params.id;
  try {
    const brand = await brandsRepositories.getBrandById(brandId);
    res.status(HttpStatusCode.OK).json({
      message: "Get detail brand successfully",
      data: brand,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const updateBrand = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const brandId = req.params.id;
    if (!file || req.body.image) {
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
    const brand = await brandsRepositories.updateBrand(
      req.body,
      fileName,
      basePath,
      brandId
    );
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create brand successfully",
      data: brand,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot create brand:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

const deleteBrand = async (req: Request, res: Response) => {
  const brandId = req?.params?.id;
  try {
    const brand = await brandsRepositories.deleteBrandById(brandId);
    if (brand) {
      res.status(HttpStatusCode.OK).json({
        message: "Delete brand successfully",
        data: { id: brand?._id },
      });
    } else {
      res.status(HttpStatusCode.OK).json({
        message: `Deleted brand ${brandId}`,
      });
    }
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};
export default {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
