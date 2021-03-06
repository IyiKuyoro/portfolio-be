import uuidv1 from 'uuid/v1';
import ApiError from '@respondex/apierror';

import ArticleAuthorService from './ArticleAuthorService';
import logger from '../logger';
import model from '../database/models';
import RedisClient from '../helpers/RedisClient';

const { Article, User } = model;

export default class ArticlesService {
  static async createArticle(articleParams) {
    try {
      const hyphenatedName = articleParams.title.replace(/\s/gi, '-');
      const uuid = uuidv1();

      const articleRecord = await Article.create({
        uuid,
        title: articleParams.title,
        category: articleParams.category,
        slug: `${hyphenatedName}-${uuid}`,
        imageUrl: articleParams.imageUrl || null,
        imagePublicId: articleParams.imagePublicId || null,
        link: articleParams.link || null,
        body: articleParams.body || null,
        external: !articleParams.body,
      });

      await ArticleAuthorService.createArticleAuthor({
        articleId: articleRecord.id,
        authorId: articleParams.authorId,
      });

      const article = await ArticlesService.findBySlug(articleRecord.slug);
      return article;
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }

  static async getArticles(page, count) {
    try {
      return Article.findAndCountAll({
        raw: true,
        limit: count,
        offset: (count * (page - 1)),
        order: [['id', 'DESC']],
        attributes: ['id', 'title', 'slug', 'category', 'imageUrl', 'link', 'external', 'createdAt', 'updatedAt'],
      });
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }

  static async findBySlug(slug) {
    try {
      const redisKey = `article:${slug}`;

      const data = await RedisClient.getAsync(redisKey);

      if (data) {
        return JSON.parse(data);
      }
      const article = await Article.findOne({
        where: {
          slug,
        },
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
          as: 'allAuthors',
        }],
      });

      RedisClient.set(redisKey, JSON.stringify(article));

      return article;
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }

  static async updateArticle(slug, data) {
    try {
      const redisKey = `article:${slug}`;
      RedisClient.del(redisKey);
      const updatedArticle = await Article.update(
        {
          ...data,
          external: !data.body,
        },
        {
          returning: true,
          where: {
            slug,
          },
        },
      );

      if (updatedArticle[0] <= 0) {
        throw new ApiError(
          'Article not found',
          [
            'Perhaps the slug provided is wrong',
            'Perhaps the article has been deleted',
          ],
          404,
        );
      }

      return updatedArticle[1][0].dataValues;
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }

  static async deleteArticle(slug) {
    try {
      RedisClient.del(`article:${slug}`);
      const article = await ArticlesService.findBySlug(slug);

      if (article === null) {
        throw new ApiError(
          'Article not found',
          [
            'Perhaps the slug provided is wrong',
            'Perhaps the article has been deleted',
          ],
          404,
        );
      }

      await article.destroy();
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }
}
