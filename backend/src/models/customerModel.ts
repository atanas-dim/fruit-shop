import { pool } from "../db";

export const readAllCustomers = async () => {
  try {
    const res = await pool.query("SELECT * FROM customer");
    return res.rows;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

export const createCustomer = async (customer: Omit<Customer, "id">) => {
  try {
    const { first_name, last_name, email } = customer;
    const res = await pool.query(
      `
      INSERT INTO customer (first_name, last_name, email) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [first_name, last_name, email]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating customer:", error);
    return null;
  }
};
