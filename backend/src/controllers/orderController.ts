import { Request, Response } from "express";
import { Order } from "../models/order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const order = new Order({
      userId,
      items,
      totalAmount,
      orderDate: new Date(),
    });
    await order.save();
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId");
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
