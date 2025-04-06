import express from "express";
import {
  addOrder,
  addOrderProduct,
  getOrderProducts,
  getOrders,
  getOrderWithProductsByOrderId,
} from "../controllers/orderController";

const router = express.Router();

router.get("/", getOrders);

router.post("/", addOrder);

router.get("/products", getOrderProducts);

router.post("/products", addOrderProduct);

router.get("/products/:order_id", getOrderWithProductsByOrderId);

// router.get("/products/:product_id", getOrderProduct);

export default router;
