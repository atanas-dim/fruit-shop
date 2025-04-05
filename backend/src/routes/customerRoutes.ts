import express from "express";
import { createCustomer, getAllCustomers } from "../models/customerModel";
const router = express.Router();

// Route to get all customers
router.get("/", async (_req, res) => {
  try {
    const customers = await getAllCustomers(); // Assuming getAllCustomers() is async
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve customers" });
  }
});

// Route to create a new customer
router.post("/", async (req, res) => {
  const { first_name, last_name, email } = req.body;

  // Basic validation
  if (!first_name || !last_name || !email) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const newCustomer = { first_name, last_name, email };

  try {
    const createdCustomer = await createCustomer(newCustomer);
    res.status(201).json(createdCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create customer" });
  }
});

export default router;
