<h2 align="center">Capivara</h2>

<p align="center">
    Library to use Express + Typescript
</p>

<div align="center">
    <img src="https://img.shields.io/badge/Typescript-latest-blue.svg">
</div>

**In development.**

`Capivara` helps you to create a modularized express application using `Typescript`.

## Set up Capivara 
In your project, just install ``Capivara``
```bash
npm install --save capivara
```

Then, create a Typescript file to bootstraps ``Capivara``. 
```typescript
import { Server } from 'capivara';

Server.bootstraps().start(); // server will start on port 3001
```

Or you can [clone here](-), a quick start project from Github.

## Docs

Docs here

## Example

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
