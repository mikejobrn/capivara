"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_helper_class_1 = require("./routing-helper.class");
/** Route Decorator */
// It has to return RequestHandlerParams type
let Router = (routerOptions) => {
    return (target) => {
        /** Annotation to identify an route type */
        target.prototype._typress_core_router_identifier = 'router_type';
        routerOptions.mountPoint = routing_helper_class_1.RoutingHelper.resolvePath(routerOptions.mountPoint);
        /** Saving routing options */
        target.prototype._typress_core_router_options = routerOptions;
    };
};
exports.Router = Router;
//# sourceMappingURL=router.decorator.js.map