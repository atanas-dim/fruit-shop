import { Request, Response } from "express";
import {
  createMultipleProducts,
  createProduct,
  getAllProducts,
} from "../models/productModel";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { name, price, available_stock } = req.body;

  if (!name || !price || !available_stock) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const createdProduct = await createProduct(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const addMultipleProducts = async (req: Request, res: Response) => {
  const products = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  try {
    const createdProducts = await createMultipleProducts(products);
    res.status(201).json(createdProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create products" });
  }
};
