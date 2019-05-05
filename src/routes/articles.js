import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ArticlesMiddleware from '../middlewares/ArticlesMiddleware';
import ArticlesController from '../controllers/ArticlesController';

const articlesRouter = Router();

// Get all articles
articlesRouter.get(
  '',
);

// Get single article
articlesRouter.get(
  '/:slug',
);

// Access middlewares
articlesRouter.use(
  AuthMiddleware.validateToken,
  AuthMiddleware.validateAdmin,
);

// Add an article
articlesRouter.post(
  '',
  ArticlesMiddleware.validateParams,
  ArticlesMiddleware.validateValues,
  ArticlesController.createArticle,
);

// Edit an article
articlesRouter.put(
  '',
);

// Delete an article
articlesRouter.delete(
  '',
);

export default articlesRouter;