"use strict";
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
        this._app = express();
        configSetter.configure(this._app);
    }
    start() {
        this._app.listen(3000);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map