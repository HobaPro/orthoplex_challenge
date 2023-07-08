import express from "express";

import dotenv from "dotenv";

import mainRouter from "./api/routers/main.router.js";

const app = express();

app.use(express.json());
dotenv.config();

app.use("/api", mainRouter);

app.listen(process.env.PORT);