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
});
