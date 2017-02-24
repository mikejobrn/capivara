"use strict";
const mocha_1 = require("mocha");
const chai = require("chai");
const server_1 = require("./server");
chai.use(require('chai-http'));
mocha_1.describe('Milestone 0.0.6', () => {
    mocha_1.before(() => {
        server_1.Server006.start();
    });
    mocha_1.it('should work without bar \'/\' in path (issue #1)', (done) => {
        chai.request('http://localhost:3001')
            .get('/api/minha-rota')
            .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect(res.text).to.be.equals('hello world');
            done();
        });
    });
    mocha_1.it('should run \'beforeMiddlewares\' for Router (issue #4)', (done) => {
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
    mocha_1.after(() => {
        server_1.Server006.close();
    });
});
//# sourceMappingURL=tests.js.map