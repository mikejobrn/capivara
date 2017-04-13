"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var types_1 = require("./types");
var routing_1 = require("./routing");
var ConfigSetter = (function () {
    function ConfigSetter() {
        this.environment = types_1.Environment.DEVELOPMENT;
        this._middlewares = [];
        this._routers = [];
    }
    Object.defineProperty(ConfigSetter.prototype, "environment", {
        get: function () {
            return this._env;
        },
        /**
         * Define in what mode the server will be running
         */
        set: function (env) {
            if (env === types_1.Environment.ANY)
                types_1.Environment.DEVELOPMENT;
            this._env = env;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Define middleware functions to the app.
     *
     * Same as ``app.use(middleware)`` when using
     * javascript to work with Express.
     *
     * ``environment``: it indicates what the servermode that
     * the middleware will running
     */
    ConfigSetter.prototype.middleware = function (middleware, environment) {
        this._middlewares.push({
            requestHandlerParam: middleware,
            environment: environment ? environment : types_1.Environment.ANY
        });
    };
    /** Configure an app with definitions at ConfigSetter. */
    ConfigSetter.prototype.configure = function (app) {
        this._configureMiddlewares(app);
        this._configureRouters(app);
    };
    /** It configures middlewares */
    ConfigSetter.prototype._configureMiddlewares = function (app) {
        var _this = this;
        this._middlewares.forEach(function (val, index) {
            if (val.environment === types_1.Environment.ANY || val.environment === _this.environment)
                app.use(val.requestHandlerParam);
        });
    };
    /** ******************
     * HANDLING WITH ROUTERS
     ********************* */
    /** Push routers to configuration  */
    ConfigSetter.prototype.setRouter = function (routers) {
        this._routers.push(routers);
    };
    /** It configures routes */
    ConfigSetter.prototype._configureRouters = function (app) {
        var _this = this;
        this._routers.forEach(function (router) {
            _this._proccessRouter(router, app);
        });
    };
    ConfigSetter.prototype._proccessRouter = function (router, app, parent) {
        if (!this._isRouterDecorated(router)) {
            throw Error('You tried to proccess an undecorated router');
        }
        if (!this._isRouterOptionsDefined(router)) {
            throw Error('You didnt defined options for router');
        }
        var routerOptions = (new router())._typress_core_router_options;
        var realRouter = express_1.Router();
        // adding middlewares (issue #4)
        this._configureRouterBeforeMiddlewares(realRouter, routerOptions.middlewares);
        // configuring routes
        for (var i = 0; i < routerOptions.routes.length; ++i) {
            if (!this._isRouteDecorated(routerOptions.routes[i])) {
                throw Error('You tried to pass an undecorated route');
            }
            this._proccessRoute(realRouter, routerOptions.routes[i]);
        }
        // here go deep through the tree
        if (routerOptions.routers) {
            for (var i = 0; i < routerOptions.routers.length; ++i) {
                this._proccessRouter(routerOptions.routers[i], null, realRouter);
            }
        }
        if (parent) {
            parent.use(routerOptions.mountPoint, realRouter);
        }
        else {
            app.use(routerOptions.mountPoint, realRouter);
        }
    };
    ConfigSetter.prototype._isRouterDecorated = function (router) {
        var routerd = new router();
        return routerd._typress_core_router_identifier
            ? routerd._typress_core_router_identifier === 'router_type'
                ? true : false
            : false;
    };
    ConfigSetter.prototype._isRouterOptionsDefined = function (router) {
        var routerd = new router();
        return routerd._typress_core_router_options ? true : false;
    };
    ConfigSetter.prototype._isRouteDecorated = function (route) {
        return (new route())._core_route_identifier ? true : false;
    };
    ConfigSetter.prototype._proccessRoute = function (router, route) {
        var _route = new route();
        var opts = _route._core_route_options;
        this._resolveMethodFunction(router, opts.method, opts.path, function (req, res, next) {
            if (route.prototype.Route.length === 2) {
                _route.Route(req, res);
            }
            else if (route.prototype.Route.length === 3) {
                _route.Route(req, res, next);
            }
        }, opts.middlewares);
    };
    ConfigSetter.prototype._configureRouterBeforeMiddlewares = function (router, middlewares) {
        var _this = this;
        if (!middlewares)
            return;
        middlewares.forEach(function (el) {
            _this._resolveMethodFunction(router, el.method, el.path, el.middleware);
        });
    };
    ConfigSetter.prototype._resolveMethodFunction = function (caller, method, path, func, middlewares) {
        var resolvedPath = path ? routing_1.RoutingHelper.resolvePath(path) : '*';
        var resolvedMethod = 'all';
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
    };
    return ConfigSetter;
}());
exports.ConfigSetter = ConfigSetter;
