import 'mocha';
import 'chai-http';
import * as chai from 'chai';
chai.use(require('chai-http'));

import { ClassWithoutRouteFunction } from './route1.helper';

describe('Route Decorator', () => {

    it('Route without Route function should throws an error', () => {

        console.log(ClassWithoutRouteFunction)

        chai.expect(() => {  }).to.throws();
    });

})
