import { Application as ExpressApplication, Router } from 'express';
import { ServerMode, RequestHandlerParams, MiddlewareConfig } from './types';

export class ConfigSetter {

    private _middlewares: Array<MiddlewareConfig>;
    private _routes: Array<Router>;
    private _serverMode: ServerMode;

    constructor() {
        this._serverMode = ServerMode.DEVELOPMENT;
        this._middlewares = [];
        this._routes = [];
    }

    public get serverMode(): ServerMode {
        return this._serverMode;
    }

    /**
     * Define in what mode the server will be running
     */
    public set serverMode(serverMode: ServerMode) {
        if(serverMode === ServerMode.ANY) ServerMode.DEVELOPMENT;
        this._serverMode = serverMode;
    }

    /** Push routes to configuration  */
    public pushRoutes(routes: Router) : void {
        this._routes.push(routes);
    }

    /**
     * Define middleware functions to the app.
     *
     * Same as ``app.use(middleware)`` when using
     * javascript to work with Express.
     *
     * ``serverMode``: it indicates what the servermode that
     * the middleware will running
     */
    public useMiddleware(middleware: RequestHandlerParams, serverMode?: ServerMode): void {
        this._middlewares.push({
            requestHandlerParam: middleware,
            serverMode: serverMode ? serverMode : ServerMode.ANY
        });
    }

    /** Configure an app with definitions at ConfigSetter. */
    public configure(app: ExpressApplication): void {
        this._configureMiddlewares(app);
        this._configureRoutes(app);
    }

    /** It configures routes */
    private _configureRoutes(app: ExpressApplication): void {
        this._routes.forEach((val: Router, index: number) => {
            app.use(val);
        });
    }

    /** It configures middlewares */
    private _configureMiddlewares(app: ExpressApplication): void {
        this._middlewares.forEach((val: MiddlewareConfig, index: number) => {
            if(val.serverMode === ServerMode.ANY || val.serverMode === this.serverMode)
                app.use(val.requestHandlerParam);
        });
    }

}
