import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Logging from "../library/Logging";
import Bike from "../models/Bike";

const createBike = async (req: Request, res: Response, next: NextFunction) => {
  const { name, price, manufacturer, size, color, wheels_size } = req.body;

  try {
    if (!name || !price || !manufacturer || !size || !color || !wheels_size) {
      return res
        .status(400)
        .json({ message: "Body incomplete! Cannot continue." });
    }

    const bikeExists = await Bike.find({ name });

    if (bikeExists.length > 0) {
      return res
        .status(400)
        .json({ message: "Bike with this name already exist!" });
    }

    const bike = new Bike({
      _id: new mongoose.Types.ObjectId(),
      name,
      price,
      manufacturer,
      size,
      color,
      wheels_size,
    });

    await bike.save();

    return res
      .status(200)
      .json({ message: "The bike was registered with success!" });
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: "Error at register" });
  }
};

const readABike = async (req: Request, res: Response, next: NextFunction) => {
  const bikeId = req.params.bikeId;

  try {
    const bikeData = await Bike.findById(bikeId);

    if (!bikeData) {
      return res.status(404).json({ message: "Bike not found!" });
    }

    return res.json(bikeData);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: "Error at read" });
  }
};

const readBikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bikesData = await Bike.find();

    if (!bikesData) {
      return res.status(404).json({ message: "Bikes not found!" });
    }

    return res.json(bikesData);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: "Error at read" });
  }
};

const updateBikes = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const bikeId = req.params.bikeId;

  try {
    const bikeData = await Bike.findOne({ id: bikeId });

    await bikeData?.updateOne(body);

    return res.status(200).json({ message: "Updated with success!"})
  } catch (error) {
    Logging.error(error);
    return res.status(500).json({ message: "Error at update" });
  }
};

export const bikeController = {
  createBike,
  readABike,
  readBikes,
  updateBikes,
};
