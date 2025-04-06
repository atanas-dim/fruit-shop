import express from "express";
import {
  postMultipleProducts,
  postProduct,
  getProducts,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);

// TODO Merge this with the /bulk route. Post single products as an array of one
router.post("/", postProduct);

router.post("/bulk", postMultipleProducts);

export default router;
