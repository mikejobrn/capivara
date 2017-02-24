import { describe, it, before, beforeEach, after } from 'mocha';
import * as chai from 'chai';
import { Server } from '../index';
import { BasicServer } from './helpers/basic-server';

chai.use(require('chai-http'));

describe('Test Cases - Milestone 0.0.6', () => {

    before(() => {
        BasicServer.start();
    })

    it('should work without bar \'/\' in path #1', (done) => {

        chai.request('http://localhost:3001')
        .get('/api/minha-rota')
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect((<any>res).text).to.be.equals('hello world');
            done();
        })

    })

    after(() => {
        BasicServer.close();
    })

})
