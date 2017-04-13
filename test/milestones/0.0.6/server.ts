import { Server, ConfigSetter, Route, Router, RouteDef,
  HttpMethod } from '../../../src/capivara';

@Route({
  path: 'minha-rota',
  method: HttpMethod.GET
})
class Rota implements RouteDef {
  Route(req: any, res: any, next: any) {
    res.send('hello world');
  }
}

@Route({
  path: '/minha-rota2',
  method: HttpMethod.GET
})
class Rota2 implements RouteDef {
  Route(req: any, res: any, next: any) {
    res.send((<any>req).temp ? (<any>req).temp : '');
  }
}

@Router({
  mountPoint: 'api',
  routes: [Rota, Rota2],
  middlewares: [
    {
      method: HttpMethod.ALL,
      middleware: (req: any, res: any, next: any) => { (<any>req).temp = 'a'; next(); }
    },
    {
      method: HttpMethod.POST,
      middleware: (req: any, res: any, next: any) => { (<any>req).temp = 'd'; next(); }
    },
    {
      method: HttpMethod.GET,
      path: 'minha-rota3',
      middleware: (req: any, res: any, next: any) => { (<any>req).temp += 'b'; next(); }
    },
    {
      method: HttpMethod.GET,
      middleware: (req: any, res: any, next: any) => { (<any>req).temp += 'b'; next(); }
    }
  ]
})
class Roteador { }


let config: ConfigSetter = new ConfigSetter();
config.setRouter(Roteador);

let Server006: Server = Server.bootstraps(config);

export { Server006 };
