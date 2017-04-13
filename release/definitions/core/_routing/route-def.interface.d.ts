import { Response, Request, NextFunction } from 'express';
export interface RouteDef {
    Route(req: Request, res: Response, next?: NextFunction): void;
}
