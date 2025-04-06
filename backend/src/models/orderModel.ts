import { pool } from "../db";

export const getAllOrders = async () => {
  try {
    const res = await pool.query("SELECT * FROM orders");
    return res.rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export const createOrder = async (customer_id: Order["customer_id"]) => {
  try {
    const res = await pool.query(
      `
      INSERT INTO "order" (customer_id) 
      VALUES ($1) 
      RETURNING *`,
      [customer_id]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
