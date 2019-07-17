import { Router } from 'express';
import TwitterMiddleware from '../middlewares/TwitterMiddleware';
import logger from '../logger';

const twitterRouter = new Router();

twitterRouter.post(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  (req) => {
    logger.log(req);
  },
);

twitterRouter.get(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  (req) => {
    logger.log(req);
  },
);

twitterRouter.put(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  (req) => {
    logger.log(req);
  },
);

export default twitterRouter;
