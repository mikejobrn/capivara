"use strict";
/** Route Decorator */
// It has to return RequestHandlerParams type
let Route = (routeOptions) => {
    return (target) => {
        /**
         * It verifies if the Route function was created,
         * and if it has min of two params and max three
         * */
        if (!target.prototype.Route)
            throw 'error - Route function is missing';
        else if (!(target.prototype.Route.length > 1 && target.prototype.Route.length < 4))
            throw 'error - Route function is missing params';
        /** Annotation to identify an route type */
        target.prototype._core_route_identifier = 'route_type';
        /** Saving routing options */
        target.prototype._core_route_options = routeOptions;
    };
};
exports.Route = Route;
//# sourceMappingURL=route.decorator.js.map