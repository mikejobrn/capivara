"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
let RotaGET = class RotaGET {
    Route(req, res, next) {
        res.status(200).send('get method');
    }
};
RotaGET = __decorate([
    index_1.Route({
        path: '',
        method: index_1.HttpMethod.GET
    })
], RotaGET);
let RotaPOST = class RotaPOST {
    Route(req, res, next) {
        res.status(200).send('post method');
    }
};
RotaPOST = __decorate([
    index_1.Route({
        path: 'post-method',
        method: index_1.HttpMethod.POST
    })
], RotaPOST);
let RotaDELETE = class RotaDELETE {
    Route(req, res, next) {
        res.status(200).send('delete method');
    }
};
RotaDELETE = __decorate([
    index_1.Route({
        path: 'path1/delete-method',
        method: index_1.HttpMethod.DELETE
    })
], RotaDELETE);
let RotaHEAD = class RotaHEAD {
    Route(req, res, next) {
        res.status(200).send('head method');
    }
};
RotaHEAD = __decorate([
    index_1.Route({
        path: 'path1/head-method',
        method: index_1.HttpMethod.HEAD
    })
], RotaHEAD);
let RotaOPTIONS = class RotaOPTIONS {
    Route(req, res, next) {
        res.status(200).send('options method');
    }
};
RotaOPTIONS = __decorate([
    index_1.Route({
        path: 'path1/other/options-method',
        method: index_1.HttpMethod.OPTIONS
    })
], RotaOPTIONS);
let RotaPATCH = class RotaPATCH {
    Route(req, res, next) {
        res.status(200).send('patch method');
    }
};
RotaPATCH = __decorate([
    index_1.Route({
        path: 'patch-method',
        method: index_1.HttpMethod.PATCH
    })
], RotaPATCH);
let RotaPUT = class RotaPUT {
    Route(req, res, next) {
        res.status(200).send('put method');
    }
};
RotaPUT = __decorate([
    index_1.Route({
        path: 'put-method',
        method: index_1.HttpMethod.PUT
    })
], RotaPUT);
let RotaANY = class RotaANY {
    Route(req, res, next) {
        res.status(200).send('all method');
    }
};
RotaANY = __decorate([
    index_1.Route({
        path: 'all-method',
        method: index_1.HttpMethod.ALL
    })
], RotaANY);
let Roteador = class Roteador {
};
Roteador = __decorate([
    index_1.Router({
        mountPoint: '',
        routes: [
            RotaGET, RotaPOST,
            RotaDELETE, RotaHEAD,
            RotaOPTIONS, RotaPATCH,
            RotaPUT, RotaANY
        ],
        middlewares: []
    })
], Roteador);
let config = new index_1.ConfigSetter();
config.setRouter(Roteador);
let Server1 = index_1.Server.bootstraps(config);
exports.Server1 = Server1;
//# sourceMappingURL=server-1.helper.js.map