import { ErrorRequestHandler, RequestHandler,
    Request as eRequest, Response as eResponse,
    NextFunction as eNext } from 'express';

/** Just a rewrite of RequestHandleParams for ExpressJs */
export type RequestHandlerParams = RequestHandler
    | ErrorRequestHandler
    | (RequestHandler | ErrorRequestHandler)[];

/** An rewrite of Express Request */
export type Request = eRequest;

/** An rewrite of express Response */
export type Response = eResponse;

/** An rewrite of express Next */
export type Next = eNext;

export type RequestHandlerBaseParams = RequestHandler | ErrorRequestHandler;
