import ApiError from '@respondex/apierror';

import ResMock from '../../__mocks__/ResMock';
import ArticlesController from '../ArticlesController';
import ArticlesService from '../../services/ArticlesService';

describe('ArticlesController', () => {
  describe('createArticle()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should split the authors', async () => {
      const req = {
        body: {
          title: 'title',
          authors: 'author1, author2',
          body: 'Body.',
          category: 'tech',
        },
      };
      jest.spyOn(ArticlesService, 'createArticle')
        .mockImplementation(() => {
          throw new Error('some error');
        });

      await ArticlesController.createArticle(req, res);

      expect(req.authors).toEqual([
        'author1',
        'author2',
      ]);
    });

    it('should respond with the newly created article', async () => {
      const req = {
        body: {
          title: 'title',
          authors: 'author1, author2',
          body: 'Body.',
          category: 'tech',
        },
      };
      jest.spyOn(ArticlesService, 'createArticle')
        .mockImplementation(() => ({
          title: 'title',
          uuid: 'xxx-xxx-xxx',
          slug: 'title-xxx-xxx-xxx',
          body: 'Body.',
          link: null,
          authors: 'author1, author2',
          category: 'tech',
          imageUrl: 'https://image.jpg',
          external: false,
        }));

      await ArticlesController.createArticle(req, res);

      expect(status).toHaveBeenCalledWith(201);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Article saved successfully',
        data: {
          title: 'title',
          uuid: 'xxx-xxx-xxx',
          slug: 'title-xxx-xxx-xxx',
          body: 'Body.',
          link: null,
          authors: 'author1, author2',
          category: 'tech',
          imageUrl: 'https://image.jpg',
          external: false,
        },
      });
    });

    it('should respond with server error if one occurs', async () => {
      jest.spyOn(ArticlesService, 'createArticle')
        .mockImplementation(() => {
          throw new Error('some error');
        });
      const req = {};

      await ArticlesController.createArticle(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'A server error has occurred! Please contact the administrator',
        possibleCauses: [
          'This error is caused by a malfunction in this application',
        ],
      });
    });
  });

  describe('getArticles()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with 204 if no articles are found', async () => {
      const req = {
        query: {
          page: 1,
          count: 10,
        },
      };
      jest.spyOn(ArticlesService, 'getArticles')
        .mockImplementation(() => ({
          count: 0,
          rows: [],
        }));

      await ArticlesController.getArticles(req, res);

      expect(status).toHaveBeenCalledWith(204);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'There are no articles on this page',
      });
    });

    it('should respond with error if one occurs', async () => {
      const req = {
        query: {
          page: 1,
          count: 10,
        },
      };
      jest.spyOn(ArticlesService, 'getArticles')
        .mockImplementation(() => {
          throw new Error('Server error');
        });

      await ArticlesController.getArticles(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'A server error has occurred! Please contact the administrator',
        possibleCauses: [
          'This error is caused by a malfunction in this application',
        ],
      });
    });

    it('should respond with the articles', async () => {
      const req = {
        query: {
          page: 1,
          count: 10,
        },
      };
      jest.spyOn(ArticlesService, 'getArticles')
        .mockImplementation(() => ({
          count: 2,
          rows: [
            {
              article: 'article',
            },
            {
              article: 'article',
            },
          ],
        }));

      await ArticlesController.getArticles(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Articles successfully retrieved',
        data: {
          pageMeta: {
            currentPage: 1,
            totalPages: 1,
            currentCount: 2,
            totalCounts: 2,
          },
          articles: [
            {
              article: 'article',
            },
            {
              article: 'article',
            },
          ],
        },
      });
    });
  });

  describe('getArticle()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with a not found error when article is not found', async () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXX',
        },
      };
      jest.spyOn(ArticlesService, 'findBySlug')
        .mockImplementation(() => null);

      await ArticlesController.getArticle(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Article not found',
        possibleCauses: [
          'Perhaps the slug you provided is wrong',
        ],
      });
    });

    it('should article if found', async () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXX',
        },
      };
      jest.spyOn(ArticlesService, 'findBySlug')
        .mockImplementation(() => ({
          title: 'title',
        }));

      await ArticlesController.getArticle(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Article found',
        data: {
          title: 'title',
        },
      });
    });
  });

  describe('updateArticle()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with the update article article', async () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXX',
        },
      };
      jest.spyOn(ArticlesService, 'updateArticle')
        .mockImplementation(async () => ({
          title: 'title',
          authors: ['authors'],
          category: 'category',
          body: 'body',
          link: null,
          external: false,
          imageUrl: 'image',
          createdAt: 'date',
          updatedAt: 'date',
        }));

      await ArticlesController.updateArticle(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Article updated',
        data: {
          title: 'title',
          authors: ['authors'],
          category: 'category',
          body: 'body',
          link: null,
          external: false,
          imageUrl: 'image',
          createdAt: 'date',
          updatedAt: 'date',
        },
      });
    });

    it('should respond with 404 if article is not found', async () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXX',
        },
      };
      jest.spyOn(ArticlesService, 'updateArticle')
        .mockImplementation(async () => {
          throw new ApiError(
            'Article not found',
            [
              'Perhaps the slug provided is wrong',
              'Perhaps the article has been deleted',
            ],
            404,
          );
        });

      await ArticlesController.updateArticle(req, res);

      expect(status).toHaveBeenCalledWith(404);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Article not found',
        possibleCauses: [
          'Perhaps the slug provided is wrong',
          'Perhaps the article has been deleted',
        ],
      });
    });
  });
});
