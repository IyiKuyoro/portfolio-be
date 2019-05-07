import RespondEx from '@respondex/core';
import ApiError from '@respondex/apierror';

import config from '../config';
import ArticlesService from '../services/ArticlesService';

export default class ArticlesController {
  static async createArticle(req, res) {
    try {
      req.authors = req.body.authors.split(', ');

      const article = await ArticlesService.createArticle({
        title: req.body.title,
        authors: req.authors,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        link: req.body.link,
        body: req.body.body,
        external: req.body.external,
      });

      RespondEx.createdResource(
        'Article saved successfully',
        {
          title: article.title,
          uuid: article.uuid,
          slug: article.slug,
          body: article.body,
          link: article.link,
          authors: article.authors,
          category: article.category,
          imageUrl: article.imageUrl,
          external: article.external,
        },
        `${config.URL}/api/v1/articles/${article.slug}`,
        res,
      );
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static async getArticles(req, res) {
    try {
      const { page } = req.query;
      const articlesData = await ArticlesService.getArticles(page, req.query.count);
      const { count, rows } = articlesData;

      if (rows.length <= 0) {
        return res.status(204).json({
          success: true,
          message: 'There are no articles on this page',
        });
      }

      const totalPages = Math.ceil(count / req.query.count);
      const resData = {
        pageMeta: {
          currentPage: +page,
          totalPages,
          currentCount: rows.length,
          totalCounts: count,
        },
        articles: rows,
      };

      return RespondEx.successWithData(
        'Articles successfully retrieved',
        resData,
        res,
      );
    } catch (error) {
      return RespondEx.error(error, res);
    }
  }

  static async getArticle(req, res) {
    try {
      const article = await ArticlesService.findBySlug(req.params.slug);

      if (article == null) {
        throw new ApiError(
          'Article not found',
          [
            'Perhaps the slug you provided is wrong',
          ],
          404,
        );
      }

      const data = {
        title: article.title,
        authors: article.authors,
        category: article.category,
        body: article.body,
        link: article.link,
        slug: article.slug,
        external: article.external,
        imageUrl: article.imageUrl,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      };

      RespondEx.successWithData(
        'Article found',
        data,
        res,
      );
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static async updateArticle(req, res) {
    try {
      const updateArticle = await ArticlesService.updateArticle(req.params.slug, req.body);

      RespondEx.successWithData(
        'Article updated',
        {
          title: updateArticle.title,
          authors: updateArticle.authors,
          category: updateArticle.category,
          body: updateArticle.body,
          link: updateArticle.link,
          external: updateArticle.external,
          imageUrl: updateArticle.imageUrl,
          createdAt: updateArticle.createdAt,
          updatedAt: updateArticle.updatedAt,
        },
        res,
      );
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static async deleteArticle(req, res) {
    try {
      await ArticlesService.deleteArticle(req.params.slug);

      RespondEx.successWithoutData(
        'Article deleted',
        res,
      );
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
