import { NextFunction, Request, Response } from "express";
import Client from "../models/Client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Logging from "../library/Logging";

async function passwordIsValid(hashedPassword: string, plainPassword: string) {
  if (!hashedPassword || !plainPassword) {
    throw new Error("Erro na verificação das senhas.");
  }

  const passIsValid = await argon2.verify(hashedPassword, plainPassword);

  return passIsValid;
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const jwtSecret: string = String(process.env.JWT_SECRET);

  if (!body) {
    return res.status(400).send("Corpo da requisição precisa ser preenchido");
  }

  const clientData = await Client.findOne({
    where: {
      username: body.username,
    },
  });

  if (
    !clientData ||
    !(await passwordIsValid(clientData.password, body.password))
  ) {
    return res.status(401).send("Não foi possível realizar o login");
  }

  const token = jwt.sign(
    {
      id: clientData.id,
      name: clientData.name,
      cpf: clientData.cpf,
      email: clientData.email,
    },
    jwtSecret
  );

  return res.send({
    name: clientData.name,
    token: token,
  });
};

export const loginController = {
    login
};
