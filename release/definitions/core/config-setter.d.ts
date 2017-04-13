import { Application as ExpressApplication } from 'express';
import { Environment, RequestHandlerParams } from './types';
export declare class ConfigSetter {
    private _middlewares;
    private _routers;
    private _env;
    constructor();
    /**
     * Define in what mode the server will be running
     */
    environment: Environment;
    /**
     * Define middleware functions to the app.
     *
     * Same as ``app.use(middleware)`` when using
     * javascript to work with Express.
     *
     * ``environment``: it indicates what the servermode that
     * the middleware will running
     */
    middleware(middleware: RequestHandlerParams, environment?: Environment): void;
    /** Configure an app with definitions at ConfigSetter. */
    configure(app: ExpressApplication): void;
    /** It configures middlewares */
    private _configureMiddlewares(app);
    /** ******************
     * HANDLING WITH ROUTERS
     ********************* */
    /** Push routers to configuration  */
    setRouter(routers: any): void;
    /** It configures routes */
    private _configureRouters(app);
    private _proccessRouter(router, app, parent?);
    private _isRouterDecorated(router);
    private _isRouterOptionsDefined(router);
    private _isRouteDecorated(route);
    private _proccessRoute(router, route);
    private _configureRouterBeforeMiddlewares(router, middlewares);
    private _resolveMethodFunction(caller, method, path, func, middlewares?);
}
