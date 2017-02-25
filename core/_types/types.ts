import {
    ErrorRequestHandler,
    RequestHandler
} from 'express';

/** Just a rewrite of RequestHandleParams for ExpressJs */
export type RequestHandlerParams = RequestHandler
    | ErrorRequestHandler
    | (RequestHandler | ErrorRequestHandler)[];

export type RequestHandlerBaseParams = RequestHandler | ErrorRequestHandler;


