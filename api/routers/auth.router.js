import { Router } from "express";
import {
    Register,
    LogIn,
    GetUser,
    GetUsers,
    VerifyUser,
    CheckUserAuthorization,
    DeleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", Register);

router.post("/login", LogIn);

router.get("/getuser", CheckUserAuthorization, GetUser);

router.get("/getusers", GetUsers);

router.delete("/deleteuser", DeleteUser);

router.put("/verifyme/:id", VerifyUser);

export default router;