import { Server, ConfigSetter,
    Route, Router, RouteDef, RouteMethod } from '../../../index';

@Route({
    path: 'minha-rota',
    method: RouteMethod.GET
})
class Rota implements RouteDef {
    Route(req, res, next) {
        res.send('hello world');
    }
}

@Route({
    path: '/minha-rota2',
    method: RouteMethod.GET
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
        (req, res, next) => { console.log('IT PASSED HERE'); (<any>req).temp = 'a'; next(); },
        (req, res, next) => { (<any>req).temp += 'b'; next(); }
    ]
})
class Roteador { }


let config: ConfigSetter = new ConfigSetter();
config.setRouter(Roteador);

let Server006: Server = Server.bootstraps(config);

export { Server006 };
