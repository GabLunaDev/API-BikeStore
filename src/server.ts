import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import authenticationMiddleware from './middlewares/AuthenticationMiddleware';
import BikeRouter from './routes/BikeRoutes';
import LoginRouter from './routes/LoginRoutes'
import ClientRouter from './routes/ClientRoutes';
import Logging from './library/Logging';
import logMiddleware from './middlewares/LogMiddleware';

const router = express();

// Connect to mongodb
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to Database');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect: ');
        Logging.error(error);
    });

// Only start the server if connect

const StartServer = () => {
    // Log Middleware
    router.use(logMiddleware.logMiddleware);

    // Express Config
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // API Rules
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    // Routes
    router.use(BikeRouter)
    router.use(LoginRouter)
    router.use(ClientRouter)


    // Error handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port: ${config.server.port}`));
};
