import Koa, { Middleware } from 'koa';
import { AppContext } from '../app';

/**
 *
 * @param ctx
 * @param next
 */
export const validationMiddleware: Middleware = async (ctx: AppContext, next: Koa.Next) => {
  return next();
}

/**
 *
 * @param ctx
 * @param next
 */
export const postJobMiddleware: Middleware = async (ctx: AppContext, next: Koa.Next) => {
  try {
    const job = await ctx.printerJobService.addJob(ctx.request.body);
    ctx.body = job.id;

  } catch (e) {
    throw e;
  }
  return next();
}

/**
 *
 */
export const postJobRouteMiddlewares = [
  validationMiddleware,
  postJobMiddleware
]
