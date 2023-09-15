import express from "express";
import { orderController } from "../app/controllers";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get(`/:id`, orderController.getOrdersById);
router.put("/:id", orderController.updateOrder);

export default router;
