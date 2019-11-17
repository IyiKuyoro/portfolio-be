import logger from '../logger';
import model from '../database/models';

const { ArticleAuthor } = model;

export default class ArticleAuthorService {
  static async createArticleAuthor(params) {
    try {
      const articleAuthor = await ArticleAuthor.create({
        authorId: params.authorId,
        articleId: params.articleId,
      });

      return articleAuthor;
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }
}
