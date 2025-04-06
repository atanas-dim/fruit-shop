import { pool } from "../db";

export const readAllOrders = async () => {
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

export const readAllOrderProducts = async (
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

export const readOrderWithProductsByOrderId = async (
  order_id: OrderProduct["order_id"]
) => {
  try {
    const res = await pool.query(
      `
      SELECT 
        "order".id,
        "order".customer_id,
        "order".created_at,
        (
          SELECT json_agg(
            json_build_object( 
              'order_product_id', order_product.id,
              'product_id', order_product.product_id,
              'quantity', order_product.quantity,
              'name', product.name,
              'price', product.price,
              'available_stock', product.available_stock
            )
            ORDER BY product.name
          )
          FROM order_product
          JOIN product ON order_product.product_id = product.id
          WHERE order_product.order_id = "order".id
        ) AS products
      FROM "order"
      WHERE "order".id = $1
    `,
      [order_id]
    );

    return res.rows;
  } catch (error) {
    console.error("Error fetching order with products:", error);
  }
};
