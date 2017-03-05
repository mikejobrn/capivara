import { Environment } from './server-mode.enum';
import { RequestHandlerParams } from './types';

export interface MiddlewareConfig {
    requestHandlerParam: RequestHandlerParams,
    environment: Environment
}
