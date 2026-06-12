import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

import { ENV } from "./config/env";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("Hello Typescript")
});


app.listen(ENV.PORT, () => console.log(`Server is running on PORT: ${ENV.PORT}`))