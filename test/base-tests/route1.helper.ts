import { Route, HttpMethod } from '../../index';

@Route({
    path: '/',
    method: HttpMethod.GET
})
export class ClassWithoutRouteFunction {

    Route(req: Request, res: Response): void {

    }

}
