"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
let Rota = class Rota {
    Route(req, res, next) {
        res.status(200).send('hello world');
    }
};
Rota = __decorate([
    index_1.Route({
        path: '',
        method: index_1.HttpMethod.GET
    })
], Rota);
let RotaPost = class RotaPost {
    Route(req, res, next) {
        res.status(200).send('method post');
    }
};
RotaPost = __decorate([
    index_1.Route({
        path: 'post-method',
        method: index_1.HttpMethod.POST
    })
], RotaPost);
let RotaDelete = class RotaDelete {
    Route(req, res, next) {
        res.status(200).send('method delete');
    }
};
RotaDelete = __decorate([
    index_1.Route({
        path: 'path1/delete-method',
        method: index_1.HttpMethod.DELETE
    })
], RotaDelete);
let Roteador = class Roteador {
};
Roteador = __decorate([
    index_1.Router({
        mountPoint: '',
        routes: [
            Rota,
            RotaPost,
            RotaDelete
        ],
        middlewares: []
    })
], Roteador);
let config = new index_1.ConfigSetter();
config.setRouter(Roteador);
let Server1 = index_1.Server.bootstraps(config);
exports.Server1 = Server1;
//# sourceMappingURL=server-1.helper.js.map