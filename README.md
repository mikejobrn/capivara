<h2 align="center">Capivara</h2>

<p align="center">
    Library to use Express + Typescript
</p>

<div align="center">
    <img src="https://img.shields.io/badge/Typescript-latest-blue.svg">
</div>

**In development.**

`Capivara` helps you to create a modularized express application using `Typescript`, and it helps you to make your app more `testable`.

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

<!--Or you can [clone here](-), a quick start project from Github.-->

## Example

`File1.ts:`
```typescript
import { Route, RouteDef, HttpMethod } from 'capivara';

@Route({
    path: '/',
    method: HttpMethod.GET
})
export class MyController implements RouteDef {

    private _test(): void {
        console.log('Just a test');
    }

    Route(req, res, next) {
        this._test();
        res.send('Hello World');
    }

} 
```

`Router.ts`
```typescript
import { MyController } from './File1'
import { Router } from 'capivara';

@Router({
    mountPoint: '/api',
    routes: [MyController],
    routers: [/** You can create a deep tree of routers */]
})
export class MyRouter { }
```

`Bootstrap.ts`
```typescript 
import { ConfigSetter, Server } from 'capivara';
import { MyRouter } from './Router';

let config: ConfigSetter = new ConfigSetter();

/** use middlewares */
config.middleware(bodyParser.json());
config.middleware(compression());

/** define routers */
config.setRouter(MyRouter);

/** configure server */
let server: Server = Server.bootstraps(config);

/** start server */
server.start(4000);

```

## Docs
For now, looks at code. It's in development, so, big changes can happen.
