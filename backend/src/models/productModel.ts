import { pool } from "../db";

export const readAllProducts = async () => {
  try {
    const res = await pool.query("SELECT * FROM product");
    return res.rows;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const createProduct = async (product: Omit<Product, "id">) => {
  try {
    const { name, price, available_stock } = product;
    const res = await pool.query(
      `
      INSERT INTO product (name, price, available_stock) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, price, available_stock]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

export const createMultipleProducts = async (
  products: Omit<Product, "id">[]
) => {
  try {
    const res = await pool.query(`
      INSERT INTO product  (name, price, available_stock)
      SELECT name, price, available_stock FROM json_populate_recordset (null:: product,
      '${JSON.stringify(products)}')
      RETURNING *`);
    return res.rows;
  } catch (error) {
    console.error("Error creating multiple products:", error);
    return null;
  }
};
