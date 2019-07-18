import { Router } from 'express';
import TwitterMiddleware from '../middlewares/TwitterMiddleware';
import logger from '../logger';
import TwitterController from '../controllers/TwitterController';

const twitterRouter = new Router();

twitterRouter.post(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  (req) => {
    logger.info(req);
  },
);

twitterRouter.get(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  (req) => {
    logger.info(req);
  },
);

twitterRouter.put(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  (req) => {
    logger.info(req);
  },
);

twitterRouter.post(
  '/webhook',
  TwitterController.addWebhook,
);

export default twitterRouter;
