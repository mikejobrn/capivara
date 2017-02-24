"use strict";
class RoutingHelper {
    static resolvePath(path) {
        // look at issue #1
        if (!path.match(/^\//g))
            return '/' + path;
        return path;
    }
}
exports.RoutingHelper = RoutingHelper;
//# sourceMappingURL=routing-helper.class.js.map