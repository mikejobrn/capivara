import { Route } from './route.decorator';
import { RequestHandler } from 'express';

export interface RouteOptions {

    /**
     * An HTTP method in lowercase.
     *
     * Like: `get`, `post`, `delete`, ..
     *
     * To all methods, see: http://expressjs.com/en/4x/api.html#routing-methods
     */
    method: string,

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
