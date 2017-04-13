"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoutingHelper = (function () {
    function RoutingHelper() {
    }
    RoutingHelper.resolvePath = function (path) {
        // look at issue #1
        if (path !== '*' && !path.match(/^\//g)) {
            return '/' + path;
        }
        return path;
    };
    return RoutingHelper;
}());
exports.RoutingHelper = RoutingHelper;
