"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const index_1 = require("../../../index");
let Rota = class Rota {
    Route(req, res, next) {
        res.send('hello world');
    }
};
Rota = __decorate([
    index_1.Route({
        path: 'minha-rota',
        method: index_1.RouteMethod.GET
    })
], Rota);
let Rota2 = class Rota2 {
    Route(req, res, next) {
        res.send(req.temp ? req.temp : '');
    }
};
Rota2 = __decorate([
    index_1.Route({
        path: '/minha-rota2',
        method: index_1.RouteMethod.GET
    })
], Rota2);
let Roteador = class Roteador {
};
Roteador = __decorate([
    index_1.Router({
        mountPoint: 'api',
        routes: [Rota, Rota2],
        beforeMiddlewares: [
            (req, res, next) => { console.log('IT PASSED HERE'); req.temp = 'a'; next(); },
            (req, res, next) => { req.temp += 'b'; next(); }
        ]
    })
], Roteador);
let config = new index_1.ConfigSetter();
config.setRouter(Roteador);
let Server006 = index_1.Server.bootstraps(config);
exports.Server006 = Server006;
//# sourceMappingURL=server.js.map