import { Router } from "express";
import {
    Register,
    LogIn,
    VerifyUser,
    CheckUserAuthorization,
    CDeleteUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/api/register", Register);
router.post("/api/login", LogIn);
//router.get("/api/getuser", CheckUserAuthorization, GetUser);
router.delete("/api/deleteuser", CDeleteUser);

export default router;