"use strict";
/** Route Decorator */
// It has to return RequestHandlerParams type
let Router = (routerOptions) => {
    return (target) => {
        /** Annotation to identify an route type */
        target.prototype._typress_core_router_identifier = 'router_type';
        if (!routerOptions.mountPoint.match(/^\//g))
            routerOptions.mountPoint = '/' + routerOptions.mountPoint;
        /** Saving routing options */
        target.prototype._typress_core_router_options = routerOptions;
    };
};
exports.Router = Router;
//# sourceMappingURL=router.decorator.js.map