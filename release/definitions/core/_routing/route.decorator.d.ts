import { RouteOptions } from './route-options.interface';
/** Route Decorator */
declare let Route: (routeOptions: RouteOptions) => (target: Function) => void;
export { Route };
