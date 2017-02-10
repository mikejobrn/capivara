"use strict";
const express_1 = require("express");
class RouterHandler {
    /**
     * Create a express ``Router`` from `routes` param.
     */
    static create(routes) {
        let routerTemp = express_1.Router();
        for (let i = 0; i < routes.length; ++i) {
            if (!this.isItDecorated(routes[i]))
                continue;
            this.push2Router(routerTemp, routes[i]);
        }
        return routerTemp;
    }
    /**
     * Verify if param is decorated by ``Route decorator``
     */
    static isItDecorated(route) {
        return (new route())._core_route_identifier ? true : false;
    }
    /**
     * Set the route in `Router`
     */
    static push2Router(router, route) {
        let _route = new route();
        let opts = _route._core_route_options;
        if (opts.method === 'get') {
            router.get(opts.path, opts.beforeMiddlewares ? opts.beforeMiddlewares : [], (req, res, next) => {
                if (route.prototype.Route.length === 2)
                    _route.Route(req, res);
                else if (route.prototype.Route.length === 3)
                    _route.Route(req, res, next);
            });
        }
    }
}
exports.RouterHandler = RouterHandler;
//# sourceMappingURL=router-handler.class.js.map