import { Application as ExpressApplication, Router,
    Request, Response, NextFunction } from 'express';
import * as express from 'express';
import * as http from 'http';
import { ConfigSetter } from './config-setter';

/**
 * Class that connects everything and
 * bootstraps a server.
 */
export class Server {

    private _app: ExpressApplication;
    private _server: http.Server;

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
    public static bootstraps(configSetter?: ConfigSetter): Server {
        return new Server(configSetter);
    }

    constructor(configSetter: ConfigSetter) {
        this._server = undefined;
        this._app = express();
        if(configSetter)
            configSetter.configure(this._app);
    }

    public start(port?: number): void {
        this._server = this._app.listen(port? port: 3001);
    }

    public close(): void {
        if(this._server) this._server.close();
    }

}
