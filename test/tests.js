"use strict";
const mocha_1 = require("mocha");
const chai = require("chai");
const basic_server_1 = require("./helpers/basic-server");
chai.use(require('chai-http'));
mocha_1.describe('Test Cases - Milestone 0.0.6', () => {
    mocha_1.before(() => {
        basic_server_1.BasicServer.start();
    });
    mocha_1.it('should work without bar \'/\' in path #1', (done) => {
        chai.request('http://localhost:3001')
            .get('/api/minha-rota')
            .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect(res.text).to.be.equals('hello world');
            done();
        });
    });
    mocha_1.after(() => {
        basic_server_1.BasicServer.close();
    });
});
//# sourceMappingURL=tests.js.map