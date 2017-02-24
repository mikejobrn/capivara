import { RequestHandlerParams, RouterMiddlewareDef } from '../types';

export interface RouterOptions {

    mountPoint: string,

    /**
     * Functions that will run before the routes of
     * this router.
     *
     * Same as ``[callback, ...]`` param.
     *
     * Example:
     *
     * ```
     *  @Router({
     *      beforeMiddlewares: [
     *          { method: ALL, callback-function },
     *          { method: GET, callback-function }
     *      ]
     *  })
     *  class Roteador { }
     * ```
     *
     * See: http://expressjs.com/en/4x/api.html#router
    */
    beforeMiddlewares?: Array<RouterMiddlewareDef>,

    routes: Array<any>,

    routers?: Array<any>
}
