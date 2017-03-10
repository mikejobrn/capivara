"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
require("chai-http");
const chai = require("chai");
const server_1 = require("./server");
chai.use(require('chai-http'));
describe('Milestone 0.0.6', () => {
    before(() => {
        server_1.Server006.start();
    });
    it('should work without bar \'/\' in path (issue #1)', (done) => {
        chai.request('http://localhost:3001')
            .get('/api/minha-rota')
            .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect(res.text).to.be.equals('hello world');
            done();
        });
    });
    it('should run \'beforeMiddlewares\' for Router (issue #4)', (done) => {
        chai.request('http://localhost:3001')
            .get('/api/minha-rota2')
            .end((err, res) => {
            // console.log(res)
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect(res.text).to.be.equals('ab');
            done();
        });
    });
    after(() => {
        server_1.Server006.close();
    });
});
//# sourceMappingURL=tests.js.map