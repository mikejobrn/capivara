"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
require("chai-http");
const chai = require("chai");
chai.use(require('chai-http'));
const route1_helper_1 = require("./route1.helper");
describe('Route Decorator', () => {
    it('Route without Route function should throws an error', () => {
        console.log(route1_helper_1.ClassWithoutRouteFunction);
        chai.expect(() => { }).to.throws();
    });
});
//# sourceMappingURL=tests.js.map