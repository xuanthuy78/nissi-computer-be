import Exception from "../../exceptions/Exception";
import { paginationTypes } from "../../global/common";
import { Category } from "../models";

const createCategory = async (
  data: any,
  fileName: string | undefined,
  basePath: string
) => {
  try {
    let category = new Category({
      name: data.name,
      icon: `${basePath}${fileName}`,
    });
    category = await category.save();

    return category;
  } catch (exception: any) {
    throw new Exception("Input error", exception.errors);
  }
};

const getAllCategories = async ({ size, page, search }: paginationTypes) => {
  let filteredCategory: any = await Category.aggregate([
    {
      $match: { name: { $regex: `.*${search}.*`, $options: "i" } },
    },
    { $skip: (parseInt(page) - 1) * parseInt(size) },
    { $limit: parseInt(size) },
  ]);

  return filteredCategory;
};

const getCategoryById = async (categoryId: string) => {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch {
    throw new Exception("Cannot find Category with id " + categoryId);
  }
};

const updateCategory = async (
  data: any,
  fileName: string | undefined,
  basePath: string,
  categoryId: string
) => {
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name: data.name,
        icon: fileName ? `${basePath}${fileName}` : data.icon,
      },
      { new: true, runValidators: true }
    );
    return category;
  } catch (exception: any) {
    throw new Exception("Input error", exception);
  }
};

const deleteCategorById = async (categoryId: string) => {
  try {
    const category = await Category.findByIdAndRemove(categoryId);
    return category;
  } catch {
    throw new Exception("Cannot find Category with id " + categoryId);
  }
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategorById,
};
