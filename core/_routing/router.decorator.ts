import { NextFunction } from 'express';
import { Response, Request } from 'express';
import { RouterOptions } from './router-options.interface';

/** Route Decorator */
// It has to return RequestHandlerParams type
let Router = (routerOptions: RouterOptions) => {
    return (target: Function) => {
        /** Annotation to identify an route type */
        (<Function>target).prototype._typress_core_router_identifier = 'router_type';
        /** Saving routing options */
        (<Function>target).prototype._typress_core_router_options = routerOptions;
    }
}

// https://gist.github.com/remojansen/16c661a7afd68e22ac6e
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes

export { Router };
