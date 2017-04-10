import { NextFunction } from 'express';
import { Response, Request } from 'express';
import { RouterOptions } from './router-options.interface';
import { RoutingHelper } from './routing-helper.class';

/** Route Decorator */
// It has to return RequestHandlerParams type
let Router = (routerOptions: RouterOptions) => {
    return (target: Function) => {
        /** Annotation to identify an route type */
        (<Function>target).prototype._typress_core_router_identifier = 'router_type';

        routerOptions.mountPoint = RoutingHelper.resolvePath(routerOptions.mountPoint);

        /** Saving routing options */
        (<Function>target).prototype._typress_core_router_options = routerOptions;
    }
}

export { Router };
