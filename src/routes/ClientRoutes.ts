import express from "express";
import { clientController } from "../controllers/ClientController";

const router = express.Router();

router.post("/api/client",clientController.create);

export = router;