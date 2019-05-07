import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ArticlesMiddleware from '../middlewares/ArticlesMiddleware';
import ArticlesController from '../controllers/ArticlesController';
import GeneralMiddleware from '../middlewares/GeneralMiddleware';

const articlesRouter = Router();

// Get single article
articlesRouter.get(
  '/:slug',
  ArticlesMiddleware.validateSlug,
  ArticlesController.getArticle,
);

// Get all articles
articlesRouter.get(
  '/',
  GeneralMiddleware.validatePaginationParams,
  ArticlesController.getArticles,
);

// Access middlewares
articlesRouter.use(
  AuthMiddleware.validateToken,
  AuthMiddleware.validateAdmin,
);

// Add an article
articlesRouter.post(
  '/',
  ArticlesMiddleware.validateParams,
  ArticlesMiddleware.validateValues,
  ArticlesController.createArticle,
);

// Edit an article
articlesRouter.put(
  '/',
);

// Delete an article
articlesRouter.delete(
  '/',
);

export default articlesRouter;
