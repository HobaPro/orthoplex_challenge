import { Router } from "express";
import AuthController from "../controller/auth.controller.js";

const router = Router();

router.post("/api/register", AuthController.Register);
router.post("/api/complete-profile", AuthController.CompleteProfile);
router.post("/api/login", AuthController.LogIn);
router.get("/api/getuser", AuthController.CheckUserAuthorization, AuthController.GetUser);
router.delete("/api/logout", AuthController.CheckUserAuthorization, AuthController.LogOut);

router.post("/api/verify-otp", AuthController.VerifyOTP);
router.post("/api/send-otp", AuthController.SendOTP);

export default router;