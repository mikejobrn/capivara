"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const index_1 = require("../../index");
let Rota = class Rota {
    Route(req, res, next) {
        res.send('hello world');
    }
};
Rota = __decorate([
    index_1.Route({
        path: 'minha-rota',
        method: index_1.RouteMethod.GET,
    })
], Rota);
let Roteador = class Roteador {
};
Roteador = __decorate([
    index_1.Router({
        mountPoint: 'api',
        routes: [Rota]
    })
], Roteador);
let config = new index_1.ConfigSetter();
config.setRouter(Roteador);
let BasicServer = index_1.Server.bootstraps(config);
exports.BasicServer = BasicServer;
//# sourceMappingURL=basic-server.js.map