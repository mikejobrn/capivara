import { Server, ConfigSetter, Route,
    Router, RouteDef, HttpMethod } from '../../index';

@Route({
    path: '',
    method: HttpMethod.GET
})
class RotaGET implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('get method');
    }
}

@Route({
    path: 'post-method',
    method: HttpMethod.POST
})
class RotaPOST implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('post method');
    }
}

@Route({
    path: 'path1/delete-method',
    method: HttpMethod.DELETE
})
class RotaDELETE implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('delete method');
    }
}

@Route({
    path: 'path1/head-method',
    method: HttpMethod.HEAD
})
class RotaHEAD implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('head method');
    }
}

@Route({
    path: 'path1/other/options-method',
    method: HttpMethod.OPTIONS
})
class RotaOPTIONS implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('options method');
    }
}

@Route({
    path: 'patch-method',
    method: HttpMethod.PATCH
})
class RotaPATCH implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('patch method');
    }
}

@Route({
    path: 'put-method',
    method: HttpMethod.PUT
})
class RotaPUT implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('put method');
    }
}

@Route({
    path: 'all-method',
    method: HttpMethod.ALL
})
class RotaANY implements RouteDef {
    Route(req: any, res: any, next: any) {
        res.status(200).send('all method');
    }
}

@Router({
    mountPoint: '',
    routes: [
        RotaGET, RotaPOST,
        RotaDELETE, RotaHEAD,
        RotaOPTIONS, RotaPATCH,
        RotaPUT, RotaANY
    ],
    middlewares: []
})
class Roteador { }


let config: ConfigSetter = new ConfigSetter();
config.setRouter(Roteador);

let Server1: Server = Server.bootstraps(config);

export { Server1 };
