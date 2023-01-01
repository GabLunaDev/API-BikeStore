import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

//Connect to mongoDb
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to Database');
    })
    .catch((error) => {
        Logging.error('Unable to connect: ');
        Logging.error(error);
    });

//Only start the server if connect
