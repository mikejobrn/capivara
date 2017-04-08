import { NextFunction } from 'express';
import { Response, Request } from 'express';
import { RouteOptions } from './route-options.interface';
import { RoutingHelper } from './routing-helper.class';

/** Route Decorator */
// It has to return RequestHandlerParams type
let Route = (routeOptions: RouteOptions) => {

    return (target: Function) => {

        /**
         * It verifies if the Route function was created,
         * and if it has min of two params and max three
         * */
        if(!target.prototype.Route)
            throw Error('Route function is missing');
        else if(!(target.prototype.Route.length > 1 && target.prototype.Route.length < 4))
            throw Error('Route function is missing params');

        /** Annotation to identify an route type */
        target.prototype._core_route_identifier = 'route_type';

        routeOptions.path = RoutingHelper.resolvePath(routeOptions.path);

        /** Saving routing options */
        target.prototype._core_route_options = routeOptions;

    }
}

export { Route };
