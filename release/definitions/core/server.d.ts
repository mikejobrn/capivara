/// <reference types="node" />
import { Application as ExpressApplication } from 'express';
import * as http from 'http';
import { ConfigSetter } from './config-setter';
/**
 * Class that connects everything and
 * bootstraps a server.
 */
export declare class Server {
    private _app;
    private _server;
    readonly app: ExpressApplication;
    readonly server: http.Server;
    constructor(configSetter: ConfigSetter);
    /**
     * Bootstraps the ExpressApplication.
     *
     * It doesn't means that the server will start,
     * after bootstraps, you'll need to start it.
     *
     * The bootstraps function exists only to
     * setup all configurations of the server.
     */
    static bootstraps(configSetter?: ConfigSetter): Server;
    start(port?: number): void;
    close(): void;
}
