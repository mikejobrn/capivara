import { RequestHandler } from 'express';

export interface RouterOptions {

    mountPoint: string,

    /**
     * Functions that will run before the routes of
     * this router.
     *
     * Same as ``[callback, ...]`` param.
     *
     * See: http://expressjs.com/en/4x/api.html#router
    */
    beforeMiddlewares?: Array<RequestHandler>,

    routes: Array<any>,

    routers?: Array<any>
}
