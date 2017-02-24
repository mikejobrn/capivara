"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
/**
 * Class that connects everything and
 * bootstraps a server.
 */
class Server {
    get app() {
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
    static bootstraps(configSetter) {
        return new Server(configSetter);
    }
    constructor(configSetter) {
        this._server = undefined;
        this._app = express();
        configSetter.configure(this._app);
    }
    start(port) {
        this._server = this._app.listen(port ? port : 3001);
    }
    close() {
        if (this._server)
            this._server.close();
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map