import Exception from "../../exceptions/Exception";
import { paginationTypes } from "../../global/common";
import { Product, Category, Brand } from "../models";

const getAllProducts = async ({
  size,
  page,
  searchString,
}: paginationTypes) => {
  let filteredProduct: any = await Product.aggregate([
    {
      $match: { productName: { $regex: `.*${searchString}.*`, $options: "i" } },
    },
    { $skip: (parseInt(page) - 1) * parseInt(size) },
    { $limit: parseInt(size) },
  ]);

  return filteredProduct;
};

const createProduct = async (
  data: any,
  fileName: string | undefined,
  basePath: string,
  imageCollection: string[]
) => {
  try {
    const category = await Category.findById(data.category);
    const brand = await Brand.findById(data.brand);
    if (category && brand) {
      let product = new Product({
        productName: data.productName,
        productSummary: data.productSummary,
        price: data.price,
        marketPrice: data.marketPrice,
        productImage: `${basePath}${fileName}`,
        imageCollection: imageCollection,
        category: data.category,
        brand: data.brand,
        quantity: data.quantity,
      });
      product = await product.save();
      return product;
    } else {
      throw new Exception(
        "Input error",
        "Please input productImage & imageCollection"
      );
    }
  } catch (exception: any) {
    throw new Exception("Input error", exception);
  }
};

export default {
  createProduct,
  getAllProducts,
};
