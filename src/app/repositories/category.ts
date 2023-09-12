import Exception from "../../exceptions/Exception";
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

export default {
  createCategory,
};
