import express from "express";
import { loginController } from "../controllers/LoginController";

const router = express.Router();

router.post("/api/login",loginController.login);

export = router;