import ResMock from '../../__mocks__/ResMock';
import ArticlesMiddleware from '../ArticlesMiddleware';

describe('ArticlesMiddleware', () => {
  describe('validateParams()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with error when params are missing', () => {
      const req = {
        body: {},
      };
      const next = jest.fn();

      ArticlesMiddleware.validateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Incomplete request params',
        possibleCauses: [
          'title not provided',
          'authors not provided',
          'category not provided',
          'body or link not both should be provided',
        ],
      });
    });

    it('should respond with error when params are missing', () => {
      const req = {
        body: {
          link: 'link',
          body: 'body',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Incomplete request params',
        possibleCauses: [
          'title not provided',
          'authors not provided',
          'category not provided',
          'body or link not both should be provided',
        ],
      });
    });

    it('should call the next middleware', () => {
      const req = {
        body: {
          title: 'title',
          authors: 'author',
          body: 'body',
          category: 'stuff',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should call the next middleware', () => {
      const req = {
        body: {
          title: 'title',
          authors: 'author',
          link: 'link',
          category: 'stuff',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateValues()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should return all errors', () => {
      const req = {
        body: {
          title: '=*abdhu:',
          authors: ':*!',
          body: '!body-',
          category: 'user',
          imageUrl: 'someWrongLink',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateValues(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid parameters',
        possibleCauses: [
          'Titles can only contain the following dataset: [ a-zA-Z0-9:!-]',
          'Authors can only contain the following dataset: [ a-zA-Z\'-,]',
          'Category only be one of the following [\'tech\', \'inspirational\', \'others\']',
          'Article body must start with the following character set [a-zA-Z0-9]',
          'Article body must end with the following character set [.!?]',
          'Link must be a valid image url',
        ],
      });
    });

    it('should return all errors', () => {
      const req = {
        body: {
          title: '=*abdhu:',
          authors: ':*!',
          category: 'user',
          link: 'someWrongLink',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateValues(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid parameters',
        possibleCauses: [
          'Titles can only contain the following dataset: [ a-zA-Z0-9:!-]',
          'Authors can only contain the following dataset: [ a-zA-Z\'-,]',
          'Category only be one of the following [\'tech\', \'inspirational\', \'others\']',
          'Link must be a valid url',
        ],
      });
    });

    it('should return call the next middleware', () => {
      const req = {
        body: {
          title: 'title',
          authors: 'author, author',
          body: 'body.',
          category: 'tech',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateValues(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateSlug()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should validation error if slug is in the wrong format', () => {
      const req = {
        params: {
          slug: 'title-=$@*:',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateSlug(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid url parameter',
        possibleCauses: [
          'The slug passed may be in the wrong format',
        ],
      });
    });

    it('should call next middleware', () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXXXX',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateSlug(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
