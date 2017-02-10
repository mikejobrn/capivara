import { Application as ExpressApplication, Router,
    Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { ConfigSetter } from './config-setter';

/**
 * Class that connects everything and
 * bootstraps a server.
 */
export class Server {

    private _app: ExpressApplication;

    get app(): ExpressApplication {
        return this._app;
    }

    /**
     * Bootstraps the ExpressApplication.
     *
     * It doesn't means that the server will start,
     * after bootstraps, you'll need to start it.
     *
     * The bootstraps function exists only to
     * setup all configurations of the server.
     */
    public static bootstraps(configSetter: ConfigSetter): Server {
        return new Server(configSetter);
    }

    constructor(configSetter: ConfigSetter) {
        this._app = express();
        configSetter.configure(this._app);
    }

    public start(): void {
        this._app.listen(3000);
    }

}
