import Exception from "../../exceptions/Exception";
import { orderItemTypes } from "../../global/common";
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

export default {
  createOrder,
};
