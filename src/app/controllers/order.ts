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

const getOrdersById = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const order = await ordersRepositories.getOrderById(orderId);
    if (order) {
      res.status(HttpStatusCode.OK).json({
        message: "Get detail order successfully",
        data: order,
      });
    } else {
      res.status(HttpStatusCode.OK).json({
        message: `Deleted order ${orderId}`,
      });
    }
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const data = req.body;
  try {
    const order = await ordersRepositories.updateOrder(data, orderId);

    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Create order successfully",
      data: order,
    });
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrdersById,
  updateOrder,
};
