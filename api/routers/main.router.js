import { Router } from "express";

import authRoute from "./auth.router.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
})

router.use(authRoute);

export default router;