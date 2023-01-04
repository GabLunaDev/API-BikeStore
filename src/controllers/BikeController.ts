import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import Bike from '../models/Bike';

const createBike = (req: Request, res: Response, next: NextFunction) => {
    const { name, price, manufacturer, size, color, wheels_size } = req.body;

    try {
        if (!name || !price || !manufacturer || !size || !color || !wheels_size) {
            return res.status(400).send({ message: 'Body incomplete! Cannot continue.' });
        }

        const bike = new Bike({
            _id: mongoose.Types.ObjectId,
            name,
            price,
            manufacturer,
            size,
            color,
            wheels_size
        });

        bike.save();

        return res.status(200).send({ message: 'The bike was registered with success!' });
    } catch (error) {
        Logging.error(error);
        return res.status(500).send({ message: 'Error at register' });
    }
};

const readABike = (req: Request, res: Response, next: NextFunction) => {
    const bikeId = req.params.bikeId
    
    try {
        const bikeData = Bike.findById(bikeId);

        if(!bikeData){
            return res.status(404).send({ message: "Bike not found!"})
        }

        return res.send(bikeData);
    } catch (error) {
        Logging.error(error);
        return res.status(500).send({message: 'Error at read'})
    }
}

const readBikes = (req: Request, res: Response, next: NextFunction) => {    
    try {
        const bikesData = Bike.find()

        if(!bikesData){
            return res.status(404).send({ message: "Bikes not found!"})
        }

        return res.send(bikesData);
    } catch (error) {
        Logging.error(error);
        return res.status(500).send({message: 'Error at read'})
    }
}
