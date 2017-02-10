let mongoose = require("mongoose");
let User = require('../model/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let config = require('../config/config');
let request = require('request');
let async = require('async');
chai.use(chaiHttp);

// Connection
mongoose.connect(config.DB_TEST);

describe('USERS', () => {

    /**
     * Empty database
     */
    beforeEach((done) => {
        User.remove({ }, (err) => {
            done();
        })
    });

    /**
     * Tests for GET / route
     */
    describe('GET /', () => {

        it('it should GET no users', (done) => {
            chai.request(config.HOST)
            .get('/')
            .end((err, res) => {

                res.should.have.status(200);
                res.body.length.should.be.eql(0);

                done();
            })
        });

        it('it should GET two users', (done) => {
            let user1 = new User({ login: 'example', password: 'example',  });
            let user2 = new User({ login: 'example1', password: 'example2' });

            async.series([
                (cb) => { user1.save((err, user) => { cb(err, user); }) },
                (cb) => { user2.save((err, user) => { cb(err, user); }) }
            ],
            (err, results) => {

                chai.request(config.HOST)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array');
                    res.body.length.should.be.eql(2);
                    res.body[0].login.should.be.eql('example');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.not.have.property('password');
                    res.body[1].login.should.be.eql('example1');
                    done();
                });

            });

        });

        it('it should GET one user using p=1 and c=1', (done) => {
            // TODO: Deve-se cadastrar dois usuários no banco de dados
            // e passar as como fields p=1 e c=1, assim, como resultado,
            // deve-se retorna somente um registro.
            done();
        });

        it('it should GET one user using p=2 and c=1', (done) => {
            // TODO: Deve-se cadastrar dois usuários no banco de dados
            // e passar as como fields p=2 e c=1, assim, como resultado,
            // deve-se retorna somente um registro.
            done();
        });

        it('it should GET only two users using p=1 and c=2', (done) => {
            // TODO
            done();
        });

        it('it should GET only two users using c=2', (done) => {
            // TODO
            done();
        });

        it('it should GET only one user using s=login.likeRegex(\'test\')', (done) => {
            // TODO
            done();
        });

        it('it should GET only one user using s=login.likeRegex(\'test\')', (done) => {
            // TODO
            done();
        });

        /** more tests using s option */

    });

});


