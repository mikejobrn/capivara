import { Router } from 'capivara';
import { MyRouteA } from './my-route-a';

@Router({
    mountPoint: '/',
    routes: [MyRouteA]
})
export class MyRouter { }
