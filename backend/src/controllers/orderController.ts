import { Request, Response } from "express";
import { createOrder, getAllOrders } from "../models/orderModel";

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

export const addOrder = async (req: Request, res: Response) => {
  const { customer_id } = req.body;

  if (!customer_id) {
    res.status(400).json({ error: "Customer ID is required" });
    return;
  }
  try {
    const createdOrder = await createOrder(customer_id);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
