import uuidv1 from 'uuid/v1';

import logger from '../logger';
import model from '../database/models';

const { Article } = model;

export default class ArticlesService {
  static async createArticle(articleParams) {
    try {
      const hyphenatedName = articleParams.title.replace(/\s/gi, '-');
      const uuid = uuidv1();

      const articleRecord = await Article.create({
        uuid,
        title: articleParams.title,
        authors: articleParams.authors,
        category: articleParams.category,
        slug: `${hyphenatedName}-${uuid}`,
        imageUrl: articleParams.imageUrl || null,
        link: articleParams.link || null,
        body: articleParams.body || null,
        external: !articleParams.body,
      });

      return articleRecord;
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
        attributes: ['id', 'title', 'slug', 'category', 'authors', 'createdAt', 'updatedAt'],
      });
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }
}
