import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import checkAuthToken from "./middleware/authMIddleware";

const PORT = process.env.PORT || 5002;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(checkAuthToken);

app.use("/api/customers", customerRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
