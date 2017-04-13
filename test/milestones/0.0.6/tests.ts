import 'mocha';
import 'chai-http';
import * as chai from 'chai';
import { Server, RoutingHelper } from '../../../src/capivara';
import { Server006 } from './server';

chai.use(require('chai-http'));

describe('Milestone 0.0.6: ', () => {

    before(() => {
        Server006.start();
    });

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

    it('path "*" should not be translated (issue #7)', () => {
      chai.expect(RoutingHelper.resolvePath('*')).to.be.equals('*');
    });

    it('path "path1" should be translated to "/path1"', () => {
      chai.expect(RoutingHelper.resolvePath('path1')).to.be.equals('/path1');
    });

    it('path "/path2" should not be translated', () => {
      chai.expect(RoutingHelper.resolvePath('/path2')).to.be.equals('/path2');
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
    });

})
