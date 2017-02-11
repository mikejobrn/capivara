<h2 align="center">typress</h2>
<p align="center">
    Library to use Express + Typescript
</p>

**In development.**

It's easy to organize complex code with `typress`.

You can easy modularize your express code with `typress`.

### Example

`File1.ts:`
```javascript
@Route({
    path: '/',
    method: 'get'
})
export class MyController implements RouteDef {

    private _test(): void {
        console.log('Just a test');
    }

    Route(req: Request, res: Response, Next: NextFunction) {
        this._test();
        res.send('Hello World');
    }

} 
```

`Router.ts`
```javascript
import { MyController } from './File1'

@Router({
    mountPoint: '/api',
    routes: [MyController],
    routers: [/** You can create a deep tree of routers */]
})
export class MyRouter { }
```
