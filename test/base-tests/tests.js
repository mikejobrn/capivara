"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
require("chai-http");
const chai = require("chai");
const server_1_helper_1 = require("./server-1.helper");
const index_1 = require("../../index");
chai.use(require('chai-http'));
describe('Route Decorator: ', () => {
    before(() => {
        server_1_helper_1.Server1.start(3030);
    });
    it('Route without Route function should throws an error', () => {
        chai.expect(() => {
            let Test = class Test {
            };
            Test = __decorate([
                index_1.Route({
                    path: '',
                    method: 0
                })
            ], Test);
        }).to.throws('Route function is missing');
    });
    it('Routes with less than two parameters should throws an error', () => {
        chai.expect(() => {
            let Test = class Test {
                Route(req) { }
            };
            Test = __decorate([
                index_1.Route({
                    path: '',
                    method: 0
                })
            ], Test);
        }).to.throws('Route function is missing params');
    });
    it('Routes with more than three parameters should throws an error', () => {
        chai.expect(() => {
            let Test = class Test {
                Route(req, res, next, wrong) { }
            };
            Test = __decorate([
                index_1.Route({
                    path: '',
                    method: 0
                })
            ], Test);
        }).to.throws('Route function is missing params');
    });
    it('GET HTTP method should works', (done) => {
        chai.request(server_1_helper_1.Server1.server)
            .get('/')
            .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect(res.text).to.be.equals('get method');
            done();
        });
    });
    it('POST HTTP method should works', (done) => {
        chai.request(server_1_helper_1.Server1.server)
            .post('/post-method')
            .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect(res.text).to.be.equals('post method');
            done();
        });
    });
    it('DELETE HTTP method should works', (done) => {
        chai.request(server_1_helper_1.Server1.server)
            .del('/path1/delete-method')
            .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect(res.text).to.be.equals('delete method');
            done();
        });
    });
    it('HEAD HTTP method should works', (done) => {
        chai.request(server_1_helper_1.Server1.server)
            .del('/path1/head-method')
            .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect(res.text).to.be.equals('head method');
            done();
        });
    });
    after(() => {
        server_1_helper_1.Server1.close();
    });
});
//# sourceMappingURL=tests.js.map