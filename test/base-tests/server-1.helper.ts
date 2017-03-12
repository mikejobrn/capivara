import { Server, ConfigSetter, Route,
    Router, RouteDef, HttpMethod } from '../../index';

@Route({
    path: '',
    method: HttpMethod.GET
})
class Rota implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('hello world');
    }
}

@Route({
    path: 'post-method',
    method: HttpMethod.POST
})
class RotaPost implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('method post');
    }
}

@Route({
    path: 'path1/delete-method',
    method: HttpMethod.DELETE
})
class RotaDelete implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('method delete');
    }
}

@Router({
    mountPoint: '',
    routes: [
        Rota,
        RotaPost,
        RotaDelete
    ],
    middlewares: []
})
class Roteador { }


let config: ConfigSetter = new ConfigSetter();
config.setRouter(Roteador);

let Server1: Server = Server.bootstraps(config);

export { Server1 };
