"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines in what mode the server
 * will startup.
 */
var Environment;
(function (Environment) {
    Environment[Environment["DEVELOPMENT"] = 0] = "DEVELOPMENT";
    Environment[Environment["TEST"] = 1] = "TEST";
    Environment[Environment["PRODUCTION"] = 2] = "PRODUCTION";
    Environment[Environment["ANY"] = 3] = "ANY";
})(Environment = exports.Environment || (exports.Environment = {}));
