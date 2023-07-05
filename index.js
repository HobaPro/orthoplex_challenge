import express from "express";
import morgan from "morgan";

import dotenv from "dotenv";

import DB from "./api/db/db.js";

dotenv.config();

import mainRoute from "./api/router/main.route.js";

DB.Init();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(mainRoute);

app.listen(process.env.PORT);