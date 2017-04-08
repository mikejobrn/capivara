"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const types_1 = require("./types");
const routing_1 = require("./routing");
class ConfigSetter {
    constructor() {
        this.environment = types_1.Environment.DEVELOPMENT;
        this._middlewares = [];
        this._routers = [];
    }
    get environment() {
        return this._env;
    }
    /**
     * Define in what mode the server will be running
     */
    set environment(env) {
        if (env === types_1.Environment.ANY)
            types_1.Environment.DEVELOPMENT;
        this._env = env;
    }
    /**
     * Define middleware functions to the app.
     *
     * Same as ``app.use(middleware)`` when using
     * javascript to work with Express.
     *
     * ``environment``: it indicates what the servermode that
     * the middleware will running
     */
    middleware(middleware, environment) {
        this._middlewares.push({
            requestHandlerParam: middleware,
            environment: environment ? environment : types_1.Environment.ANY
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
            if (val.environment === types_1.Environment.ANY || val.environment === this.environment)
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
        if (!this._isRouterDecorated(router)) {
            throw Error('You tried to proccess an undecorated router');
        }
        if (!this._isRouterOptionsDefined(router)) {
            throw Error('You didnt defined options for router');
        }
        let routerOptions = (new router())._typress_core_router_options;
        let realRouter = express_1.Router();
        // adding middlewares (issue #4)
        this._configureRouterBeforeMiddlewares(realRouter, routerOptions.middlewares);
        // configuring routes
        for (let i = 0; i < routerOptions.routes.length; ++i) {
            if (!this._isRouteDecorated(routerOptions.routes[i])) {
                throw Error('You tried to pass an undecorated route');
            }
            this._proccessRoute(realRouter, routerOptions.routes[i]);
        }
        // here go deep through the tree
        if (routerOptions.routers) {
            for (let i = 0; i < routerOptions.routers.length; ++i) {
                this._proccessRouter(routerOptions.routers[i], null, realRouter);
            }
        }
        if (parent) {
            parent.use(routerOptions.mountPoint, realRouter);
        }
        else {
            app.use(routerOptions.mountPoint, realRouter);
        }
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
        this._resolveMethodFunction(router, opts.method, opts.path, (req, res, next) => {
            if (route.prototype.Route.length === 2) {
                _route.Route(req, res);
            }
            else if (route.prototype.Route.length === 3) {
                _route.Route(req, res, next);
            }
        }, opts.middlewares);
    }
    _configureRouterBeforeMiddlewares(router, middlewares) {
        if (!middlewares)
            return;
        middlewares.forEach((el) => {
            this._resolveMethodFunction(router, el.method, el.path, el.middleware);
        });
    }
    _resolveMethodFunction(caller, method, path, func, middlewares) {
        let resolvedPath = path ? routing_1.RoutingHelper.resolvePath(path) : '*';
        console.log(resolvedPath);
        let resolvedMethod = 'all';
        if (method === types_1.HttpMethod.DELETE) {
            resolvedMethod = 'delete';
        }
        else if (method === types_1.HttpMethod.GET) {
            resolvedMethod = 'get';
        }
        else if (method === types_1.HttpMethod.HEAD) {
            resolvedMethod = 'head';
        }
        else if (method === types_1.HttpMethod.OPTIONS) {
            resolvedMethod = 'options';
        }
        else if (method === types_1.HttpMethod.PATCH) {
            resolvedMethod = 'patch';
        }
        else if (method === types_1.HttpMethod.POST) {
            resolvedMethod = 'post';
        }
        else if (method === types_1.HttpMethod.PUT) {
            resolvedMethod = 'put';
        }
        caller[resolvedMethod](resolvedPath, middlewares ? middlewares : [], func);
    }
}
exports.ConfigSetter = ConfigSetter;
//# sourceMappingURL=config-setter.js.map