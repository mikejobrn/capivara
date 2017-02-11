<h2 align="center">typress</h2>
<p align="center">
    Library to use Express + Typescript
</p>

**In development.**

## It's easy and organizer to grow up with **typress**.

`File1.ts:`
```javascript
@Route({
    path: '/',
    method: 'get'
})
export class MyController {

    Route(req: Request, res: Response, Next: NextFunction) {
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
