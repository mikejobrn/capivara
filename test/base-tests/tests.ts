import 'mocha';
import 'chai-http';
import * as chai from 'chai';
import { Server1 } from './server-1.helper';
import { Route } from '../../index';

chai.use(require('chai-http'));

describe('Route Decorator: ', () => {

    before(() => {
        Server1.start(3030);
    })

    it('Route without Route function should throws an error', () => {
        chai.expect(() => {

            @Route({
                path: '',
                method: 0
            })
            class Test { }

        }).to.throws('Route function is missing');
    });

    it('Routes with less than two parameters should throws an error', () => {
        chai.expect(() => {

            @Route({
                path: '',
                method: 0
            })
            class Test {

                Route(req: any) { }

            }

        }).to.throws('Route function is missing params');
    });

    it('Routes with more than three parameters should throws an error', () => {
        chai.expect(() => {

            @Route({
                path: '',
                method: 0
            })
            class Test {

                Route(req: any, res: any, next: any, wrong: any) { }

            }

        }).to.throws('Route function is missing params');
    });

    it('GET HTTP method should works' , (done) => {
        chai.request(Server1.server)
        .get('/')
        .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect((<any>res).text).to.be.equals('get method');
            done();
        })
    })

    it('POST HTTP method should works' , (done) => {
        chai.request(Server1.server)
        .post('/post-method')
        .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect((<any>res).text).to.be.equals('post method');
            done();
        })
    })

    it('DELETE HTTP method should works' , (done) => {
        chai.request(Server1.server)
        .del('/path1/delete-method')
        .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect((<any>res).text).to.be.equals('delete method');
            done();
        })
    })

    it('HEAD HTTP method should works' , (done) => {
        chai.request(Server1.server)
        .head('/path1/head-method')
        .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect((<any>res).text).to.be.equals('head method');
            done();
        })
    })

    it('OPTIONS HTTP method should works' , (done) => {
        chai.request(Server1.server)
        .options('/path1/other/options-method')
        .end((err, res) => {
            chai.expect(res.status).to.be.equals(200);
            chai.expect((<any>res).text).to.be.equals('options method');
            done();
        })
    })

    after(() => {
        Server1.close();
    })

})
