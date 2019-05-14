import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ArticlesMiddleware from '../middlewares/ArticlesMiddleware';
import ArticlesController from '../controllers/ArticlesController';
import GeneralMiddleware from '../middlewares/GeneralMiddleware';

const articlesRouter = Router();

// Get all medium articles
articlesRouter.get(
  '/medium',
  ArticlesController.getMediumArticles,
);

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
  '/:slug',
  ArticlesMiddleware.validateSlug,
  ArticlesMiddleware.validateUpdateParams,
  ArticlesController.updateArticle,
);

// Delete an article
articlesRouter.delete(
  '/:slug',
  ArticlesMiddleware.validateSlug,
  ArticlesController.deleteArticle,
);

export default articlesRouter;
