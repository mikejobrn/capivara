import { ErrorRequestHandler, RequestHandler,
    Request as eRequest, Response as eResponse,
    NextFunction as eNext } from 'express';

/** Just a rewrite of RequestHandleParams for ExpressJs */
export type RequestHandlerParams = RequestHandler
    | ErrorRequestHandler
    | (RequestHandler | ErrorRequestHandler)[];

/** Just rewrites of express */
export type Request = eRequest;
export type Response = eResponse;
export type Next = eNext;

export type RequestHandlerBaseParams = RequestHandler | ErrorRequestHandler;
