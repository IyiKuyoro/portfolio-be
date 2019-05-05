import RespondEx from '@respondex/core';

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
}
