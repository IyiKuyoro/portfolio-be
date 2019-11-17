import RespondEx from '@respondex/core';
import ApiError from '@respondex/apierror';
import feed from 'rss-to-json';

import config from '../config';
import ArticlesService from '../services/ArticlesService';
import ArticleAuthorService from '../services/ArticleAuthorService';
import logger from '../logger';

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
        allAuthors: req.userData.id,
      });

      await ArticleAuthorService.createArticleAuthor({
        articleId: article.id,
        authorId: req.userData.id,
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

      const authors = article.allAuthors.map(authorData => `${authorData.firstName} ${authorData.lastName}`);
      const authorsIds = article.allAuthors.map(authorData => authorData.id);

      const data = {
        title: article.title,
        category: article.category,
        body: article.body,
        link: article.link,
        slug: article.slug,
        external: article.external,
        imageUrl: article.imageUrl,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        authors,
        authorsIds,
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

  static getMediumArticles(req, res) {
    try {
      feed.load(
        'https://medium.com/feed/@iyikuyoro',
        (error, response) => {
          if (error) {
            throw error;
          }

          RespondEx.successWithData(
            'Articles found',
            response.items,
            res,
          );
        },
      );
    } catch (error) {
      logger.log('error', error.message);
      RespondEx.error(error, res);
    }
  }
}
