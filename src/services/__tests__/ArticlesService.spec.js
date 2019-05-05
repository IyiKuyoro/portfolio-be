import model from '../../database/models';
import ArticlesService from '../ArticlesService';

const { Article } = model;

describe('ArticlesService', () => {
  describe('createArticle', () => {
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
});
