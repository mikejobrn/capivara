import { ErrorRequestHandler, RequestHandler, Request as eRequest, Response as eResponse, NextFunction as eNext } from 'express';
/** Just a rewrite of RequestHandleParams for ExpressJs */
export declare type RequestHandlerParams = RequestHandler | ErrorRequestHandler | (RequestHandler | ErrorRequestHandler)[];
/** An rewrite of Express Request */
export declare type Request = eRequest;
/** An rewrite of express Response */
export declare type Response = eResponse;
/** An rewrite of express Next */
export declare type Next = eNext;
export declare type RequestHandlerBaseParams = RequestHandler | ErrorRequestHandler;
