"use strict";
/**
 * Choose the Route Method
 *
 * There aren't all HTTP methods here,
 * just to simplify.
 */
var RouteMethod;
(function (RouteMethod) {
    RouteMethod[RouteMethod["GET"] = 0] = "GET";
    RouteMethod[RouteMethod["HEAD"] = 1] = "HEAD";
    RouteMethod[RouteMethod["OPTIONS"] = 2] = "OPTIONS";
    RouteMethod[RouteMethod["POST"] = 3] = "POST";
    RouteMethod[RouteMethod["PATCH"] = 4] = "PATCH";
    RouteMethod[RouteMethod["PUT"] = 5] = "PUT";
    RouteMethod[RouteMethod["DELETE"] = 6] = "DELETE";
})(RouteMethod = exports.RouteMethod || (exports.RouteMethod = {}));
// https://tools.ietf.org/html/rfc7231#section-4.3
//# sourceMappingURL=route-method.enum.js.map