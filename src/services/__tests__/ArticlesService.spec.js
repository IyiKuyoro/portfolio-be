import model from '../../database/models';
import ArticlesService from '../ArticlesService';

const { Article } = model;

describe('ArticlesService', () => {
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

      const article = await ArticlesService.createArticle({
        title: 'title',
        author: 'author',
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
});
