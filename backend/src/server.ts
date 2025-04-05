import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";

const PORT = process.env.PORT || 5002;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
