import { NextFunction, Request, Response } from "express";
import { Product, Category } from "../models";

const createProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = await Category.findById(req.body.category);
  // if (!category) return res.status(400).send("Invalid Category");

  // const file = req.file;
  // if (!file) return res.status(400).send("No image in the request");

  // const fileName = file.filename;
  // const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  let product = new Product({
    productName:
      "M\u00e0n H\u00ecnh Cong OLED Gaming LG UltraGear 45GR95QE-B (44.5 inch,  WQHD 3440 x 1440, 240Hz, 0.03ms, sRGB 98.5%)",
  });
  console.log(product);
  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send("vao");
};

export default { createProducts };
