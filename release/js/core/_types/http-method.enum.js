"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Choose the HTTP Method
 *
 * There aren't all HTTP methods here,
 * just to simplify.
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 0] = "GET";
    HttpMethod[HttpMethod["HEAD"] = 1] = "HEAD";
    HttpMethod[HttpMethod["OPTIONS"] = 2] = "OPTIONS";
    HttpMethod[HttpMethod["POST"] = 3] = "POST";
    HttpMethod[HttpMethod["PATCH"] = 4] = "PATCH";
    HttpMethod[HttpMethod["PUT"] = 5] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 6] = "DELETE";
    HttpMethod[HttpMethod["ALL"] = 7] = "ALL";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
// https://tools.ietf.org/html/rfc7231#section-4.3
