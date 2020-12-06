import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("API Working....");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_ID));

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  )
);
