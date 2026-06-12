import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

import { ENV } from "./config/env";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("Hello Typescript")
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);


app.listen(ENV.PORT, () => console.log(`Server is running on PORT: ${ENV.PORT}`))