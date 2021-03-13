import Router from 'koa-router';
import { postJobRouteMiddlewares } from './postJob';
import { getHealthMiddleware } from './getHealth';

const router = new Router();
// router.use(handleErrorMiddleware);

router.get('/health', getHealthMiddleware);
router.post('/job', ...postJobRouteMiddlewares);

export default router;
