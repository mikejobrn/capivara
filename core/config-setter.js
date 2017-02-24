"use strict";
const express_1 = require("express");
const types_1 = require("./types");
const routing_1 = require("./routing");
class ConfigSetter {
    constructor() {
        this._serverMode = types_1.ServerMode.DEVELOPMENT;
        this._middlewares = [];
        this._routers = [];
    }
    get serverMode() {
        return this._serverMode;
    }
    /**
     * Define in what mode the server will be running
     */
    set serverMode(serverMode) {
        if (serverMode === types_1.ServerMode.ANY)
            types_1.ServerMode.DEVELOPMENT;
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
    useMiddleware(middleware, serverMode) {
        this._middlewares.push({
            requestHandlerParam: middleware,
            serverMode: serverMode ? serverMode : types_1.ServerMode.ANY
        });
    }
    /** Configure an app with definitions at ConfigSetter. */
    configure(app) {
        this._configureMiddlewares(app);
        this._configureRouters(app);
    }
    /** It configures middlewares */
    _configureMiddlewares(app) {
        this._middlewares.forEach((val, index) => {
            if (val.serverMode === types_1.ServerMode.ANY || val.serverMode === this.serverMode)
                app.use(val.requestHandlerParam);
        });
    }
    /** ******************
     * HANDLING WITH ROUTERS
     ********************* */
    /** Push routers to configuration  */
    setRouter(routers) {
        this._routers.push(routers);
    }
    /** It configures routes */
    _configureRouters(app) {
        this._routers.forEach((router) => {
            this._proccessRouter(router, app);
        });
    }
    _proccessRouter(router, app, parent) {
        if (!this._isRouterDecorated(router))
            throw Error('You tried to proccess an undecorated router');
        if (!this._isRouterOptionsDefined(router))
            throw Error('You didnt defined options for router');
        let routerOptions = (new router())._typress_core_router_options;
        let realRouter = express_1.Router();
        for (let i = 0; i < routerOptions.routes.length; ++i) {
            if (!this._isRouteDecorated(routerOptions.routes[i]))
                throw Error('You tried to pass an undecorated route');
            this._proccessRoute(realRouter, routerOptions.routes[i]);
        }
        // here go deep through the tree
        if (routerOptions.routers)
            for (let i = 0; i < routerOptions.routers.length; ++i)
                this._proccessRouter(routerOptions.routers[i], null, realRouter);
        // temp
        // adding beforeMiddlewares (issue #4)
        if (routerOptions.beforeMiddlewares)
            for (let i = 0; i < routerOptions.beforeMiddlewares.length; ++i) {
                realRouter.all('*', routerOptions.beforeMiddlewares[i]);
            }
        if (parent)
            parent.use(routerOptions.mountPoint, realRouter);
        else
            app.use(routerOptions.mountPoint, realRouter);
    }
    _isRouterDecorated(router) {
        let routerd = new router();
        return routerd._typress_core_router_identifier
            ? routerd._typress_core_router_identifier === 'router_type'
                ? true : false
            : false;
    }
    _isRouterOptionsDefined(router) {
        let routerd = new router();
        return routerd._typress_core_router_options ? true : false;
    }
    _isRouteDecorated(route) {
        return (new route())._core_route_identifier ? true : false;
    }
    _proccessRoute(router, route) {
        let _route = new route();
        let opts = _route._core_route_options;
        if (opts.method === routing_1.RouteMethod.GET) {
            router.get(opts.path, opts.beforeMiddlewares ? opts.beforeMiddlewares : [], (req, res, next) => {
                if (route.prototype.Route.length === 2)
                    _route.Route(req, res);
                else if (route.prototype.Route.length === 3)
                    _route.Route(req, res, next);
            });
        }
    }
}
exports.ConfigSetter = ConfigSetter;
//# sourceMappingURL=config-setter.js.map