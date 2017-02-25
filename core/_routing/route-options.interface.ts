import { Route } from './route.decorator';
import { RequestHandler } from 'express';
import { HttpMethod } from '../types';

export interface RouteOptions {

    /**
     * A HTTP method.
     */
    method: HttpMethod,

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
