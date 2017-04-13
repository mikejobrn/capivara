import { RouterOptions } from './router-options.interface';
/** Route Decorator */
declare let Router: (routerOptions: RouterOptions) => (target: Function) => void;
export { Router };
