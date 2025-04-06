import { Request, Response } from "express";
import {
  createOrder,
  createOrderProduct,
  getAllOrderProducts,
  getAllOrders,
  getOrderWithAllProductsByOrderId,
} from "../models/orderModel";

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

export const getOrderProducts = async (req: Request, res: Response) => {
  const { order_id } = req.query;

  if (!order_id) {
    res.status(400).json({ error: "Order ID is required" });
    return;
  }
  if (Array.isArray(order_id)) {
    res.status(400).json({ error: "Order ID must be a single value" });
    return;
  }
  if (isNaN(Number(order_id))) {
    res.status(400).json({ error: "Order ID must be a number" });
    return;
  }

  try {
    const orderProducts = await getAllOrderProducts(Number(order_id));
    res.json(orderProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve order products" });
  }
};

export const addOrderProduct = async (req: Request, res: Response) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    if (!order_id || !product_id || !quantity) {
      res
        .status(400)
        .json({ error: "Order ID, Product ID, and Quantity are required" });
      return;
    }

    // TODO Add additional validation for order_id, product_id, and quantity
    // Could also check if the product is available in stock

    const createdOrderProduct = await createOrderProduct({
      order_id,
      product_id,
      quantity,
    });
    res.status(201).json(createdOrderProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order product" });
  }
};

//TODO Improve naming pattern/convention of controller vs model functions to avoid confusion from similarity of names
export const getOrderWithProductsByOrderId = async (
  req: Request,
  res: Response
) => {
  try {
    const { order_id } = req.params;
    if (!order_id) {
      res.status(400).json({ error: "Order ID is required" });
      return;
    }
    // TODO Add additional validation for order_id

    const orderWithProducts = await getOrderWithAllProductsByOrderId(
      Number(order_id)
    );
    res.json(orderWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve order with products" });
  }
};
