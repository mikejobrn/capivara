import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as errorhandler from 'errorhandler';
import { Server, ConfigSetter, Environment } from 'capivara';
import { MyRouter } from 'my-router';
import { Configuration } from './configuration';

/* ****************************************
 *  CONFIGURATION
 * ************************************** */
let config: ConfigSetter = new ConfigSetter();

/** setting environment */
config.environment = Environment.DEVELOPMENT;

/** applying multiple middlewares */
config.middleware(morgan('dev'));
config.middleware(bodyParser.urlencoded({ extended: false }));
config.middleware(bodyParser.json());
config.middleware(helmet());
config.middleware(compression());

/** it'll only be executed on dev enviroment */
config.middleware(errorhandler(), Environment.DEVELOPMENT);

/** it applies global custom middlewares */
config.middleware((req, res, next) => {
    console.log('my custom middleware');
    next();
});

/** applying routes */
config.setRouter(myRouter);

/* ****************************************
 *  STARTING THE SERVER
 * ************************************** */
let server: Server = Server.bootstraps(config);

/**
 * you could start the server after an event
 * is emitted, like "the database is ready".
 */
server.start(Configuration.PORT);

