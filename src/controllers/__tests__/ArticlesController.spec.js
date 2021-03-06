import ApiError from '@respondex/apierror';
import feed from 'rss-to-json';

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

    it('should respond with the newly created article', async () => {
      const req = {
        body: {
          title: 'title',
          body: 'Body.',
          category: 'tech',
        },
        userData: {
          id: 1,
        },
      };
      jest.spyOn(ArticlesService, 'createArticle')
        .mockImplementation(() => ({
          title: 'title',
          uuid: 'xxx-xxx-xxx',
          slug: 'title-xxx-xxx-xxx',
          body: 'Body.',
          link: null,
          allAuthors: [{
            firstName: 'author',
            lastName: 'one',
            id: 1,
          }],
          category: 'tech',
          imageUrl: 'https://image.jpg',
          imagePublicId: 'public-id',
          external: false,
        }));

      await ArticlesController.createArticle(req, res);

      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Article saved successfully',
        data: {
          title: 'title',
          uuid: 'xxx-xxx-xxx',
          slug: 'title-xxx-xxx-xxx',
          body: 'Body.',
          link: null,
          authors: ['author one'],
          authorsIds: [1],
          category: 'tech',
          imageUrl: 'https://image.jpg',
          imagePublicId: 'public-id',
          external: false,
        },
      });
      expect(status).toHaveBeenCalledWith(201);
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
          uuid: 'xxx-xxx-xxx',
          slug: 'title-xxx-xxx-xxx',
          body: 'Body.',
          link: null,
          allAuthors: [{
            firstName: 'author',
            lastName: 'one',
            id: 1,
          }],
          category: 'tech',
          imageUrl: 'https://image.jpg',
          imagePublicId: 'public-id',
          external: false,
        }));

      await ArticlesController.getArticle(req, res);

      expect(status).toHaveBeenCalledWith(200);
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

  describe('deleteArticle()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with 404 if the slug is wrong', async () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXX',
        },
      };
      jest.spyOn(ArticlesService, 'deleteArticle')
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

      await ArticlesController.deleteArticle(req, res);

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

    it('should respond with 200 if the article is deleted', async () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXX',
        },
      };
      jest.spyOn(ArticlesService, 'deleteArticle')
        .mockImplementation(async () => true);

      await ArticlesController.deleteArticle(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Article deleted',
      });
    });
  });

  describe('getMediumArticles()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should should respond with 500 if an error occurs', () => {
      const req = {};
      jest.spyOn(feed, 'load')
        .mockImplementation((url, cb) => cb(new Error('Something went wrong')));

      ArticlesController.getMediumArticles(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'A server error has occurred! Please contact the administrator',
        possibleCauses: [
          'This error is caused by a malfunction in this application',
        ],
      });
    });

    it('should should respond with articles', () => {
      const req = {};
      jest.spyOn(feed, 'load')
        .mockImplementation((url, cb) => {
          cb(null, {
            items: [{
              article: 'article',
            }],
          });
        });

      ArticlesController.getMediumArticles(req, res);

      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Articles found',
        data: [{
          article: 'article',
        }],
      });
    });
  });
});
