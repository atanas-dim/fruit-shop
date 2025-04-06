import express from "express";
import {
  postOrder,
  postOrderProduct,
  getOrderProducts,
  getOrders,
  getOrderWithProductsByOrderId,
} from "../controllers/orderController";

const router = express.Router();

router.get("/", getOrders);

router.post("/", postOrder);

router.get("/products", getOrderProducts);

// TODO Update this to post multiple products as an array in req.body. Post single ones as an array of one
router.post("/products", postOrderProduct);

router.get("/products/:order_id", getOrderWithProductsByOrderId);

export default router;
