import {
    Router, RequestHandler,
    ErrorRequestHandler, Request,
    Response, NextFunction } from 'express';

declare namespace typress {

    type RequestHandlerParams = RequestHandler
        | ErrorRequestHandler
        | (RequestHandler | ErrorRequestHandler)[];

    enum HttpMethod {
        /**
         * The GET method requests transfer of a current selected representation
         * for the target resource.  GET is the primary mechanism of information
         * retrieval and the focus of almost all performance optimizations.
         * Hence, when people speak of retrieving some identifiable information
         * via HTTP, they are generally referring to making a GET request.
         *
         * See: https://tools.ietf.org/html/rfc7231#section-4.3
         */
        GET,

        /**
         * The HEAD method is identical to GET except that the server MUST NOT
         * send a message body in the response (i.e., the response terminates at
         * the end of the header section).  The server SHOULD send the same
         * header fields in response to a HEAD request as it would have sent if
         * the request had been a GET, except that the payload header fields
         * (Section 3.3) MAY be omitted.  This method can be used for obtaining
         * metadata about the selected representation without transferring the
         * representation data and is often used for testing hypertext links for
         * validity, accessibility, and recent modification.
         *
         * See: https://tools.ietf.org/html/rfc7231#section-4.3
         */
        HEAD,

        /**
         * The POST method requests that the target resource process the
         * representation enclosed in the request according to the resource's
         * own specific semantics.  For example, POST is used for the following
         * functions (among others):
         *
         * o  Providing a block of data, such as the fields entered into an HTML
         * form, to a data-handling process;
         *
         * o  Posting a message to a bulletin board, newsgroup, mailing list,
         *  blog, or similar group of articles;
         *
         * o  Creating a new resource that has yet to be identified by the
         * origin server; and
         *
         * o  Appending data to a resource's existing representation(s).
         *
         * See: https://tools.ietf.org/html/rfc7231#section-4.3
         */
        POST,

        OPTIONS,

        PATCH,

        PUT,

        DELETE
    }

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

    /**
     * Route function definition.
     *
     * It needs implementation in a class
     * with `Route` decorator.
     */
    interface RouteDef {
        Route(req: Request, res: Response, next?: NextFunction): void;
    }

    class RouterHandler {

        public static create(routes: Array<any>): Router;

    }

    /**
     * This class handle with configurations
     * of express.
     */
    class ConfigSetter {

        /** Get the ServerMode of ConfigSetter */
        serverMode(): ServerMode;

        constructor();

        /**
         * Define in what mode the server
         * will be running
         */
        serverMode(serverMode: ServerMode);

        /** Push routers to configuration  */
        public setRouter(routers: any|Array<any>) : void;

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
