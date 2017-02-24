import { NextFunction } from 'express';
import { Response, Request } from 'express';
import { RouteOptions } from './route-options.interface';

/** Route Decorator */
// It has to return RequestHandlerParams type
let Route = (routeOptions: RouteOptions) => {

    return (target: Function) => {

        /**
         * It verifies if the Route function was created,
         * and if it has min of two params and max three
         * */
        if(!target.prototype.Route)
            throw Error('error - Route function is missing');
        else if(!(target.prototype.Route.length > 1 && target.prototype.Route.length < 4))
            throw Error('error - Route function is missing params');

        /** Annotation to identify an route type */
        (<Function>target).prototype._core_route_identifier = 'route_type';

        if(!routeOptions.path.match(/^\//g))
            routeOptions.path = '/'+routeOptions.path;

        /** Saving routing options */
        (<Function>target).prototype._core_route_options = routeOptions;

    }
}

// https://gist.github.com/remojansen/16c661a7afd68e22ac6e
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes

export { Route };
