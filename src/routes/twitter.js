import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import TwitterMiddleware from '../middlewares/TwitterMiddleware';
import TwitterController from '../controllers/TwitterController';

const twitterRouter = new Router();

twitterRouter.post(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  TwitterController.logActivity,
);

twitterRouter.get(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  TwitterController.logActivity,
);

twitterRouter.put(
  '/activity/listen',
  TwitterMiddleware.challengeResponseCheck,
  TwitterController.logActivity,
);

// Generate Request
twitterRouter.post(
  '/request',
  AuthMiddleware.validateToken,
  AuthMiddleware.validateAdmin,
  TwitterController.generateRequest,
);

export default twitterRouter;
