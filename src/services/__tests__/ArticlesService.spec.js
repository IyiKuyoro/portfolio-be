import model from '../../database/models';
import ArticlesService from '../ArticlesService';
import ArticleAuthorService from '../ArticleAuthorService';
import logger from '../../logger';

const { Article } = model;

describe('ArticlesService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('createArticle()', () => {
    it('should throw an error if one occurs.', async (done) => {
      try {
        jest.spyOn(Article, 'create')
          .mockImplementation(() => {
            throw new Error('Server error has occurred');
          });

        await ArticlesService.createArticle({
          title: 'title',
          author: 'author',
          category: 'tech',
        });
      } catch (error) {
        expect(error.message).toEqual('Server error has occurred');
        done();
      }
    });

    it('should return the newly created data', async () => {
      jest.spyOn(Article, 'create')
        .mockImplementation(() => ({
          article: 'stuffStuff',
        }));
      jest.spyOn(Article, 'create')
        .mockImplementation(() => ({
          id: '1',
        }));
      jest.spyOn(ArticleAuthorService, 'createArticleAuthor')
        .mockImplementation(() => ({}));
      jest.spyOn(ArticlesService, 'findBySlug')
        .mockImplementation(() => ({
          article: 'stuffStuff',
        }));

      const article = await ArticlesService.createArticle({
        title: 'title',
        authorId: 'author',
        category: 'tech',
      });

      expect(article).toEqual({
        article: 'stuffStuff',
      });
    });
  });

  describe('getArticles()', () => {
    it('should throw an error if one occurs.', async (done) => {
      try {
        jest.spyOn(Article, 'findAndCountAll')
          .mockImplementation(() => {
            throw new Error('Server error has occurred');
          });

        await ArticlesService.getArticles(1, 10);
      } catch (error) {
        expect(error.message).toEqual('Server error has occurred');
        done();
      }
    });

    it('should return the newly created data', async () => {
      jest.spyOn(Article, 'findAndCountAll')
        .mockImplementation(() => ([{
          article: 'stuffStuff',
        }]));

      const article = await ArticlesService.getArticles(1, 10);

      expect(article).toEqual([{
        article: 'stuffStuff',
      }]);
    });
  });

  describe('findBySlug()', () => {
    it('should throw an error if one occurs.', async (done) => {
      try {
        jest.spyOn(Article, 'findOne')
          .mockImplementation(() => {
            throw new Error('Server error has occurred');
          });

        await ArticlesService.findBySlug('title-XXXXXXXXX');
      } catch (error) {
        expect(error.message).toEqual('Server error has occurred');
        done();
      }
    });

    it('should return an article', async () => {
      jest.spyOn(Article, 'findOne')
        .mockImplementation(() => ([{
          article: 'stuffStuff',
        }]));

      const article = await ArticlesService.findBySlug('title-XXXXXXXXX');

      expect(article).toEqual([{
        article: 'stuffStuff',
      }]);
    });
  });

  describe('updateArticle()', () => {
    it('should throw an error if article is not found', async (done) => {
      try {
        jest.spyOn(Article, 'update')
          .mockImplementation(async () => [0, []]);

        await ArticlesService.updateArticle('title-XXXXXXXXX', {
          title: 'title',
          body: 'Body.',
        });
      } catch (error) {
        expect(error.message).toEqual('Article not found');
        done();
      }
    });

    it('should return the updated article', async () => {
      jest.spyOn(Article, 'update')
        .mockImplementation(async () => [1, [{
          dataValues: {
            title: 'title',
          },
        }]]);

      const updatedArticle = await ArticlesService.updateArticle('title-XXXXXXXXX', {
        title: 'title',
        body: 'Body.',
      });

      expect(updatedArticle).toEqual({
        title: 'title',
      });
    });
  });

  describe('deleteArticle()', () => {
    it('should throw a 404 error if article is not found', async (done) => {
      try {
        jest.spyOn(ArticlesService, 'findBySlug')
          .mockImplementation(async () => null);

        await ArticlesService.deleteArticle('title-XXXXXXXXX');
      } catch (error) {
        expect(error.message).toEqual('Article not found');
        done();
      }
    });

    it('should return the delete article', async () => {
      jest.spyOn(ArticlesService, 'findBySlug')
        .mockImplementation(async () => ({
          destroy: () => {},
        }));
      jest.spyOn(logger, 'log')
        .mockImplementation(async () => {});

      await ArticlesService.deleteArticle('title-XXXXXXXXX');

      expect(logger.log).toHaveBeenCalledTimes(0);
    });
  });
});
