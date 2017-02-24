import { Server, ConfigSetter,
    Route, Router, RouteDef, RouteMethod } from '../../index';

@Route({
    path: 'minha-rota',
    method: RouteMethod.GET,
})
class Rota implements RouteDef {

    Route(req, res, next) {
        res.send('hello world');
    }
}

@Router({
    mountPoint: 'api',
    routes: [Rota]
})
class Roteador { }


let config: ConfigSetter = new ConfigSetter();
config.setRouter(Roteador);

let BasicServer: Server = Server.bootstraps(config);

export { BasicServer };
