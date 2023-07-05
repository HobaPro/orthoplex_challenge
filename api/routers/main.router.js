import { Router } from "express";

import authRoute from "./auth.route.js";
import interactionsRoute from "./interactions.route.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
})

router.use(authRoute);
router.use(interactionsRoute);

export default router;