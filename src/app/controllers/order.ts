import { Request, Response } from "express";
import HttpStatusCode from "../../exceptions/HttpStatusCode";
import { ordersRepositories } from "../repositories";
import { MAX_RECORDS, paginationTypes } from "../../global/common";

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
const getAllOrders = async (req: Request, res: Response) => {
  try {
    let {
      page = "1",
      size = MAX_RECORDS,
      search = "",
    }: paginationTypes = req.query as paginationTypes;

    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    const filteredOrder = await ordersRepositories.getAllOrders({
      size,
      page,
      search,
    });

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create order successfully",
      size: filteredOrder.length,
      page,
      search,
      data: filteredOrder,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "Cannot order:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
};

export default {
  createOrder,
  getAllOrders,
};
