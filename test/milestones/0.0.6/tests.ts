import 'mocha';
import 'chai-http';
import * as chai from 'chai';
import { Server } from '../../../index';
import { Server006 } from './server';

chai.use(require('chai-http'));

describe('Milestone 0.0.6: ', () => {

    before(() => {
        Server006.start();
    })

    it('should work without bar \'/\' in path (issue #1)', (done) => {

        chai.request('http://localhost:3001')
        .get('/api/minha-rota')
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect((<any>res).text).to.be.equals('hello world');
            done();
        })

    });

    it('should run \'beforeMiddlewares\' for Router (issue #4)', (done) => {

        chai.request('http://localhost:3001')
        .get('/api/minha-rota2')
        .end((err, res) => {
            // console.log(res)
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect((<any>res).text).to.be.equals('ab');
            done();
        })


    });

    after(() => {
        Server006.close();
    })

})
