import { RequestHandlerBaseParams, HttpMethod } from './index';

/**
 * A definition to create a middleware
 * to a Router.
 */
export interface RouterMiddlewareDef {
    method: HttpMethod,
    path?: string,
    middleware: RequestHandlerBaseParams
}
