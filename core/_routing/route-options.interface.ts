import { Route } from './route.decorator';
import { RouteMethod } from './route-method.enum';
import { RequestHandler } from 'express';

export interface RouteOptions {

    /**
     * A HTTP method.
     */
    method: RouteMethod,

    /** The path that will represent the route */
    path: string,

    /**
     * Functions that will run before the route
     *
     * Same as ``[callback, ...]`` param.
     *
     * See: http://expressjs.com/en/4x/api.html#router.METHOD
    */
    beforeMiddlewares?: Array<RequestHandler>
}
