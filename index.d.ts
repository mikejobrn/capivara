import { Router, RequestHandler,
    ErrorRequestHandler } from 'express';

declare namespace typress {

    type RequestHandlerParams = RequestHandler
    | ErrorRequestHandler
    | (RequestHandler | ErrorRequestHandler)[];

    enum ServerMode {
        DEVELOPMENT,
        TEST,
        PRODUCTION,
        ANY
    }

    interface MiddlewareConfig {
        requestHandlerParam: RequestHandlerParams,
        serverMode: ServerMode
    }

    interface RouteOptions {

        /**
         * An HTTP method in lowercase.
         *
         * Like: `get`, `post`, `delete`, ..
         *
         * To all methods, see: http://expressjs.com/en/4x/api.html#routing-methods
         */
        method: string,

        /** The path that will represent the route */
        path: string,

        /**
         * Functions that will run before the route
         *
         * Same as ``[callback, ...]`` param.
         *
         * See: http://expressjs.com/en/4x/api.html#router.METHOD
        */
        beforeMiddlewares?: Array<RequestHandler>
    }

    function Route(routeOptions: RouteOptions);

    class RouterHandler {

         public static create(routes: Array<any>) : Router;

    }

    /**
     * This class handle with configurations
     * of express.
     */
    class ConfigSetter {

        /** Get the ServerMode of ConfigSetter */
        serverMode(): ServerMode;

        /**
         * Define in what mode the server
         * will be running
         */
        serverMode(serverMode: ServerMode);

        /** Push routes to configuration  */
        public pushRoutes(routes: Router) : void;

        /**
         * Define middleware functions to the app.
         *
         * Same as ``app.use(middleware)`` when using
         * javascript to work with Express.
         *
         * ``serverMode``: it indicates what the servermode that
         * the middleware will running
         */
        public useMiddleware(middleware: RequestHandlerParams,
            serverMode?: ServerMode): void

    }

    /**
     * Class that connects everything and
     * bootstraps a server.
     */
    class Server {

        /**
         * Bootstraps the ExpressApplication.
         *
         * It doesn't means that the server will start,
         * after bootstraps, you'll need to start it.
         *
         * The bootstraps function exists only to
         * setup all configurations of the server.
         */
        public static bootstraps(configSetter: ConfigSetter): Server;

        /**
         * Start the server
         */
        public start(): void;

    }

}

export = typress;
