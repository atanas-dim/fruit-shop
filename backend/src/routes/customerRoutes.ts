import express from "express";
import { addCustomer, getCustomers } from "../controllers/customerController";

const router = express.Router();

router.get("/", getCustomers);

router.post("/", addCustomer);

export default router;
