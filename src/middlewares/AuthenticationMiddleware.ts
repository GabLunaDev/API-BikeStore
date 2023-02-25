import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();
const app = express();
app.use(cookieParser());

export default class authenticationMiddleware{
    public static authentication(req: Request, res: Response, next: NextFunction){
        try {
            const token = String(req.headers["x-access-token"]);

            if(!token){
                return res.status(400).send({   valid: false, error: "Token não identificado." })
            }

            jwt.verify(token, String(process.env.JWT_SECRET), (error: any, decoded: any) => {
                if(error){
                    return res.status(401).json({
                        valid: false,
                        error: "Unauthenticated user"
                    });
                }

                req.secure = {
                    ...decoded,
                }
                next();
            })

        } catch (error) {
            console.log(error);
            res.status(401).send({ valid: false, error: "exception", req: req.body })
        }
    }
}