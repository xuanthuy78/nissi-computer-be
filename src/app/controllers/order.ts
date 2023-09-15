import { Request, Response } from "express";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import { ordersRepositories } from "../repositories";

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const order = await ordersRepositories.createOrder(data);

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create order successfully",
      data: order,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot create order:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

export default {
  createOrder,
};
