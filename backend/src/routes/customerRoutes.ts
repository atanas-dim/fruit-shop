import express from "express";
import { postCustomer, getCustomers } from "../controllers/customerController";

const router = express.Router();

router.get("/", getCustomers);

router.post("/", postCustomer);

export default router;
