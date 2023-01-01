import Logging from '../library/Logging';

export default class logMiddleware {
    public static logMiddleware(req: any, res: any, next: any) {
        //Log the Request
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //Log the Response
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Statu: [${req.statusCode}]`);
        });

        next();
    }
}
