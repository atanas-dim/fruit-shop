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

export const getAllOrderProducts = async (
  order_id: OrderProduct["order_id"]
) => {
  try {
    const res = await pool.query(
      `
      SELECT * FROM order_products
      WHERE order_id = $1
    `,
      [order_id]
    );
    return res.rows;
  } catch (error) {
    console.error("Error fetching order products:", error);
  }
};

export const createOrderProduct = async (
  orderProduct: Omit<OrderProduct, "id">
) => {
  try {
    const { order_id, product_id, quantity } = orderProduct;
    const res = await pool.query(
      `
      INSERT INTO order_product (order_id, product_id, quantity) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [order_id, product_id, quantity]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating order product:", error);
  }
};

export const getOrderWithAllProductsByOrderId = async (
  order_id: OrderProduct["order_id"]
) => {
  try {
    const res = await pool.query(
      `
      SELECT 
        "order".id,
        "order".customer_id,
        "order".created_at,
        order_product.id AS order_product_id,
        order_product.product_id,
        order_product.quantity,
        product.name AS product_name,
        product.price AS product_price,
        product.available_stock AS product_available_stock
      FROM "order"
      JOIN order_product ON "order".id = order_product.order_id
      JOIN product ON order_product.product_id = product.id
      WHERE "order".id = $1
      GROUP BY "order".id, order_product.id, product.id
      ORDER BY order_product.id

    `,
      [order_id]
    );

    return res.rows;
  } catch (error) {
    console.error("Error fetching order with products:", error);
  }
};
