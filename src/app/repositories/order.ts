import Exception from "../../exceptions/Exception";
import { orderItemTypes, paginationTypes } from "../../global/common";
import { Order, OrderItem } from "../models";

const createOrder = async (data: any) => {
  try {
    const orderItemsIds = Promise.all(
      data.orderItems.map(async (orderItem: orderItemTypes) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    let order = new Order({
      orderItems: orderItemsIdsResolved,
      firstName: data.firstName,
      lastName: data.lastName,
      shippingAddress: data.shippingAddress,
      zip: data.zip,
      phone: data.phone,
      status: data.status,
      totalPrice: data.totalPrice,
    });

    order = await order.save();

    return order;
  } catch (exception: any) {
    throw new Exception("Input error", exception.errors);
  }
};

const getAllOrders = async ({ size, page, search }: paginationTypes) => {
  let filteredOrder: any = await Order.aggregate([
    {
      $match: { firstName: { $regex: `.*${search}.*`, $options: "i" } },
    },
    { $skip: (parseInt(page) - 1) * parseInt(size) },
    { $limit: parseInt(size) },
    { $sort: { createdAt: -1 } },
  ]);

  return filteredOrder;
};

const getOrderById = async (orderId: string) => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch {
    throw new Exception("Cannot find order with id " + orderId);
  }
};

const updateOrder = async (data: any, orderId: string) => {
  try {
    const category = await Order.findByIdAndUpdate(
      orderId,
      {
        status: data.status,
      },
      { new: true, runValidators: true }
    );
    return category;
  } catch (exception: any) {
    throw new Exception("Input error", exception);
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
};
