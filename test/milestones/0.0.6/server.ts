import { Server, ConfigSetter, Route,
    Router, RouteDef, HttpMethod } from '../../../index';

@Route({
    path: 'minha-rota',
    method: HttpMethod.GET
})
class Rota implements RouteDef {
    Route(req, res, next) {
        res.send('hello world');
    }
}

@Route({
    path: '/minha-rota2',
    method: HttpMethod.GET
})
class Rota2 implements RouteDef {
    Route(req, res, next) {
        res.send((<any>req).temp ? (<any>req).temp : '');
    }
}

@Router({
    mountPoint: 'api',
    routes: [Rota, Rota2],
    beforeMiddlewares: [
        {
            method: HttpMethod.ALL,
            middleware: (req, res, next) => { (<any>req).temp = 'a'; next(); }
        },
        {
            method: HttpMethod.POST,
            middleware: (req, res, next) => { (<any>req).temp = 'd'; next(); }
        },
        {
            method: HttpMethod.GET,
            path: 'minha-rota3',
            middleware: (req, res, next) => { (<any>req).temp += 'b'; next(); }
        },
        {
            method: HttpMethod.GET,
            middleware: (req, res, next) => { (<any>req).temp += 'b'; next(); }
        }
    ]
})
class Roteador { }


let config: ConfigSetter = new ConfigSetter();
config.setRouter(Roteador);

let Server006: Server = Server.bootstraps(config);

export { Server006 };
