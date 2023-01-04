import express from "express";
import { bikeController } from "../controllers/BikeController";

const router = express.Router();

router.post("/api/bike", bikeController.createBike);
router.get("/api/bike", bikeController.readBikes);
router.get("/api/bike/:bikeId", bikeController.readABike);

export = router;