import { Application as ExpressApplication, Router,
    Request, Response, NextFunction } from 'express';
import { ServerMode, RequestHandlerParams,
    MiddlewareConfig } from './types';
import { RouterOptions, RouteOptions,
    RouteMethod } from './routing'

export class ConfigSetter {

    private _middlewares: Array<MiddlewareConfig>;
    private _routers: Array<any>;
    private _serverMode: ServerMode;

    constructor() {
        this._serverMode = ServerMode.DEVELOPMENT;
        this._middlewares = [];
        this._routers = [];
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
        this._configureRouters(app);
    }

    /** It configures middlewares */
    private _configureMiddlewares(app: ExpressApplication): void {
        this._middlewares.forEach((val: MiddlewareConfig, index: number) => {
            if(val.serverMode === ServerMode.ANY || val.serverMode === this.serverMode)
                app.use(val.requestHandlerParam);
        });
    }

    /** ******************
     * HANDLING WITH ROUTERS
     ********************* */

    /** Push routers to configuration  */
    public setRouter(routers: any) : void {
        this._routers.push(routers);
    }

    /** It configures routes */
    private _configureRouters(app: ExpressApplication): void {
        this._routers.forEach((router: any, index: number) => {
            this._proccessRouter(router, app);
        });
    }

    private _proccessRouter(router: any, app: ExpressApplication, parent?: Router): void {
        if(!this._isRouterDecorated(router)) throw 'You tried to proccess an undecorated router';
        if(!this._isRouterOptionsDefined(router)) throw 'You didnt defined options for router';

        let routerOptions: RouterOptions = (new router())._typress_core_router_options;

        let realRouter: Router = Router();

        for(let i: number = 0; i < routerOptions.routes.length; ++i) {
            if(!this._isRouteDecorated(routerOptions.routes[i]))
                throw 'You tried to pass an undecorated route';
            this._proccessRoute(realRouter, routerOptions.routes[i]);
        }

        // here go deep through the tree
        if(routerOptions.routers)
            for(let i: number = 0; i < routerOptions.routers.length; ++i)
                this._proccessRouter(routerOptions.routers[i], null, realRouter);

        if(parent)
            parent.use(routerOptions.mountPoint, realRouter);
        else
            app.use(routerOptions.mountPoint, realRouter);
    }

    private _isRouterDecorated(router: any): boolean {
        let routerd: any = new router();
        return routerd._typress_core_router_identifier
            ? routerd._typress_core_router_identifier === 'router_type'
                ? true : false
            : false;
    }

    private _isRouterOptionsDefined(router: any): boolean {
        let routerd: any = new router();
        return routerd._typress_core_router_options ? true : false;
    }

    private _isRouteDecorated(route: any): boolean {
        return (new route())._core_route_identifier ? true : false;
    }

    private _proccessRoute(router: Router, route: any): void {
        let _route: any = new route();
        let opts: RouteOptions = _route._core_route_options;
        if(opts.method === RouteMethod.GET) {
            router.get(opts.path,
                opts.beforeMiddlewares ? opts.beforeMiddlewares : [],
                (req: Request, res: Response, next: NextFunction) => {
                    if(route.prototype.Route.length === 2)
                        _route.Route(req, res);
                    else if(route.prototype.Route.length === 3)
                        _route.Route(req, res, next);
                });
        }
    }

}
