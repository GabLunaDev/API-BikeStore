import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import argon2 from 'argon2';
import Logging from "../library/Logging";
import Client from "../models/Client";
import Address from "../models/Address";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const { name, age, cpf, cellphone, email, password, address} = req.body

    const clientAlreadyExists = await Client.findOne({
        where: {
            cpf
        }
    })

    if(clientAlreadyExists){
        return res.status(400).send({ message: "Client Already Exists" })
    }

    const hashedPassword: string = await argon2.hash(password);

    const client = new Client({
        id: new mongoose.Types.ObjectId(),
        name,
        age,
        cpf,
        cellphone,
        email,
        password: hashedPassword
    })

    const addressData = new Address({
        id: new mongoose.Types.ObjectId(),
        street: address.street,
        number: address.number,
        completition: address.completition,
        reference: address.reference
    })

    await client.save();
    await addressData.save();

    return res.status(200).send({ message: "Client Created With Success!"});
}


export const clientController = {
    create
}