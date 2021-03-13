import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';

import router from './routes';
import { PrinterJobService } from '../services/PrinterJobService';

export interface AppContext extends Koa.Context {
  printerJobService: PrinterJobService
}

export interface AppState extends Koa.DefaultState {
}

interface CreateAppOptions {
  printerJobService: PrinterJobService
}

export function createApp(options: CreateAppOptions) {
  const app = new Koa<AppState, AppContext>();

  app.context.printerJobService = options.printerJobService;

  // Generic error handling middleware.
  app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (error) {
      ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
      error.status = ctx.status;
      ctx.body = { error };
      ctx.app.emit('error', error, ctx);
    }
  });

  app.use(bodyParser({ enableTypes: ['text'] }));
  app.use(router.routes());

  app.on('error', console.error);

  return app;
}
