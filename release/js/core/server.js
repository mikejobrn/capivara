"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/**
 * Class that connects everything and
 * bootstraps a server.
 */
var Server = (function () {
    function Server(configSetter) {
        this._server = undefined;
        this._app = express();
        if (configSetter) {
            configSetter.configure(this._app);
        }
    }
    Object.defineProperty(Server.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "server", {
        get: function () {
            return this._server;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Bootstraps the ExpressApplication.
     *
     * It doesn't means that the server will start,
     * after bootstraps, you'll need to start it.
     *
     * The bootstraps function exists only to
     * setup all configurations of the server.
     */
    Server.bootstraps = function (configSetter) {
        return new Server(configSetter);
    };
    Server.prototype.start = function (port) {
        this._server = this._app.listen(port ? port : 3001);
    };
    Server.prototype.close = function () {
        if (this._server)
            this._server.close();
    };
    return Server;
}());
exports.Server = Server;
