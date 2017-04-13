export class RoutingHelper {

    public static resolvePath(path: string): string {
        // look at issue #1
        if(path !== '*' &&  !path.match(/^\//g)) { return '/'+path; }
        return path;
    }

}
