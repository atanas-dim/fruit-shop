import { Request, Response } from "express";
import { createCustomer, getAllCustomers } from "../models/customerModel";

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
};

export const addCustomer = async (req: Request, res: Response) => {
  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const createdCustomer = await createCustomer(req.body);
    res.status(201).json(createdCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};
