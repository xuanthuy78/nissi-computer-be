import Exception from "../../exceptions/Exception";
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

export default {
  createBread,
};
