import Exception from "../../exceptions/Exception";
import { paginationTypes } from "../../global/common";
import { Product, Category, Brand } from "../models";

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
      throw new Exception("Input error", "Please input category & brand");
    }
  } catch (exception: any) {
    throw new Exception("Input error", exception);
  }
};

const getAllProducts = async ({ size, page, search }: paginationTypes) => {
  let filteredProduct: any = await Product.aggregate([
    {
      $match: { productName: { $regex: `.*${search}.*`, $options: "i" } },
    },
    { $skip: (parseInt(page) - 1) * parseInt(size) },
    { $limit: parseInt(size) },
  ]);

  return filteredProduct;
};

const getProductById = async (productId: string) => {
  try {
    const product = await Product.findById(productId)
      .populate("category")
      .populate("brand");
    return product;
  } catch {
    throw new Exception("Cannot find Product with id " + productId);
  }
};

const updateProduct = async (
  data: any,
  fileName: string | undefined,
  basePath: string,
  imageCollection: string[],
  productId: string
) => {
  const category = await Category.findById(data.category);
  const brand = await Brand.findById(data.brand);
  try {
    if (category && brand) {
      const product = await Product.findByIdAndUpdate(
        productId,
        {
          productName: data.productName,
          productSummary: data.productSummary,
          price: data.price,
          productImage: fileName ? `${basePath}${fileName}` : data.productImage,
          imageCollection: imageCollection
            ? imageCollection
            : data.imageCollection,
          marketPrice: data.marketPrice,
          category: data.category,
          brand: data.brand,
          quantity: data.quantity,
        },
        { new: true }
      )
        .populate("category")
        .populate("brand");
      return product;
    } else {
      throw new Exception("Input error", "Please input category & brand");
    }
  } catch (exception: any) {
    throw new Exception("Input error", exception);
  }
};

const deleteProductById = async (productId: string) => {
  try {
    const product = await Product.findByIdAndRemove(productId);
    return product;
  } catch {
    throw new Exception("Cannot find Product with id " + productId);
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
};
