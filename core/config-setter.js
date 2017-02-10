"use strict";
const types_1 = require("./types");
class ConfigSetter {
    constructor() {
        this._serverMode = types_1.ServerMode.DEVELOPMENT;
        this._middlewares = [];
        this._routes = [];
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
    /** Push routes to configuration  */
    pushRoutes(routes) {
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
    useMiddleware(middleware, serverMode) {
        this._middlewares.push({
            requestHandlerParam: middleware,
            serverMode: serverMode ? serverMode : types_1.ServerMode.ANY
        });
    }
    /** Configure an app with definitions at ConfigSetter. */
    configure(app) {
        this._configureMiddlewares(app);
        this._configureRoutes(app);
    }
    /** It configures routes */
    _configureRoutes(app) {
        this._routes.forEach((val, index) => {
            app.use(val);
        });
    }
    /** It configures middlewares */
    _configureMiddlewares(app) {
        this._middlewares.forEach((val, index) => {
            if (val.serverMode === types_1.ServerMode.ANY || val.serverMode === this.serverMode)
                app.use(val.requestHandlerParam);
        });
    }
}
exports.ConfigSetter = ConfigSetter;
//# sourceMappingURL=config-setter.js.map