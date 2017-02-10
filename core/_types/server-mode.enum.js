"use strict";
/**
 * Defines in what mode the server
 * will startup.
 */
var ServerMode;
(function (ServerMode) {
    ServerMode[ServerMode["DEVELOPMENT"] = 0] = "DEVELOPMENT";
    ServerMode[ServerMode["TEST"] = 1] = "TEST";
    ServerMode[ServerMode["PRODUCTION"] = 2] = "PRODUCTION";
    ServerMode[ServerMode["ANY"] = 3] = "ANY";
})(ServerMode = exports.ServerMode || (exports.ServerMode = {}));
//# sourceMappingURL=server-mode.enum.js.map