import { Application as ExpressApplication, Router,
    Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { ConfigSetter } from './config-setter';

declare class Server {

    app(): ExpressApplication;
    public static bootstraps(configSetter: ConfigSetter) : Server;
    public start(): void;

}
