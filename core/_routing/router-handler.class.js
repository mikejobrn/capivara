"use strict";
const express_1 = require("express");
const route_method_enum_1 = require("./route-method.enum");
class RouterHandler {
    /**
     * Create a express ``Router`` from `routes` param.
     */
    static create(routes) {
        let routerTemp = express_1.Router();
        for (let i = 0; i < routes.length; ++i) {
            if (!this.isItDecorated(routes[i]))
                throw 'You tried to pass an undecorated route';
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
        if (opts.method === route_method_enum_1.RouteMethod.GET) {
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