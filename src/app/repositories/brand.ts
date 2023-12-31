import Exception from "../../exceptions/Exception";
import { paginationTypes } from "../../global/common";
import { Brand } from "../models";

const createBread = async (
  data: any,
  fileName: string | undefined,
  basePath: string
) => {
  try {
    let brand = new Brand({
      name: data.name,
      image: `${basePath}${fileName}`,
    });
    brand = await brand.save();

    return brand;
  } catch (exception: any) {
    throw new Exception("Input error", exception.errors);
  }
};

const getAllBrands = async ({ size, page, search }: paginationTypes) => {
  let filteredBrand: any = await Brand.aggregate([
    {
      $match: { name: { $regex: `.*${search}.*`, $options: "i" } },
    },
    { $skip: (parseInt(page) - 1) * parseInt(size) },
    { $limit: parseInt(size) },
  ]);

  return filteredBrand;
};

const getBrandById = async (brandId: string) => {
  try {
    const brand = await Brand.findById(brandId);
    return brand;
  } catch {
    throw new Exception("Cannot find Brand with id " + brandId);
  }
};

const updateBrand = async (
  data: any,
  fileName: string | undefined,
  basePath: string,
  brandId: string
) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      brandId,
      {
        name: data.name,
        image: fileName ? `${basePath}${fileName}` : data.image,
      },
      { new: true, runValidators: true }
    );
    return brand;
  } catch (exception: any) {
    throw new Exception("Input error", exception);
  }
};

const deleteBrandById = async (brandId: string) => {
  try {
    const brand = await Brand.findByIdAndRemove(brandId);
    return brand;
  } catch {
    throw new Exception("Cannot find Brand with id " + brandId);
  }
};

export default {
  createBread,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrandById,
};
