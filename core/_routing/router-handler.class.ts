import { Router, Request, Response, NextFunction } from 'express';
import { RouteOptions } from './route-options.interface';
import { RouteMethod } from './route-method.enum';

export class RouterHandler {

    /**
     * Create a express ``Router`` from `routes` param.
     */
    public static create(routes: Array<any>) : Router {
        let routerTemp: Router = Router();
        for(let i: number = 0; i < routes.length; ++i) {
            if(!this.isItDecorated(routes[i]))
                throw 'You tried to pass an undecorated route';
            this.push2Router(routerTemp, routes[i]);
        }
        return routerTemp;
    }

    /**
     * Verify if param is decorated by ``Route decorator``
     */
    private static isItDecorated(route: any): boolean {
        return (new route())._core_route_identifier ? true : false;
    }

    /**
     * Set the route in `Router`
     */
    private static push2Router(router: Router, route: any): void {
        let _route: any = new route();
        let opts: RouteOptions = _route._core_route_options;
        if(opts.method === RouteMethod.GET) {
            router.get(opts.path,
                opts.beforeMiddlewares ? opts.beforeMiddlewares : [],
                (req: Request, res: Response, next: NextFunction) => {
                    if(route.prototype.Route.length === 2)
                        _route.Route(req, res);
                    else if(route.prototype.Route.length === 3)
                        _route.Route(req, res, next);
                });
        }
    }

}
