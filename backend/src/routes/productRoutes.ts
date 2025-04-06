import express from "express";
import {
  addMultipleProducts,
  addProduct,
  getProducts,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);

router.post("/", addProduct);

router.post("/bulk", addMultipleProducts);

export default router;
