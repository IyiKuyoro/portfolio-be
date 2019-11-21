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
          imagePublicId: 'publicId',
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
          'Category only be one of the following [\'tech\', \'inspirational\', \'others\']',
          'Link must be a valid url',
        ],
      });
    });

    it('should return all errors', () => {
      const req = {
        body: {
          title: '=*abdhu:',
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

  describe('validateUpdateParams()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with 400 if no parameters are passed', () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXXXX',
        },
        body: {},
      };
      const next = jest.fn();

      ArticlesMiddleware.validateUpdateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Incomplete request parameters',
        possibleCauses: [
          'You have to pass at least one parameter to be updated',
        ],
      });
    });

    it('should call the next middleware', () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXXXX',
        },
        body: {
          link: 'https://link.com',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateUpdateParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should respond with 400 if parameter is not valid', () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXXXX',
        },
        body: {
          body: '=body*',
          title: ')(',
          authors: '#123',
          category: 'user',
          imageUrl: 'image',
          slug: 'slug',
          id: 'id',
          uuid: 'uuid',
          external: 'external',
          default: 'default',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateUpdateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid request parameter',
        possibleCauses: [
          'Titles can only contain the following dataset: [ a-zA-Z0-9:!-]',
          'Authors can only contain the following dataset: [ a-zA-Z\'-,]',
          'Category only be one of the following [\'tech\', \'inspirational\', \'others\']',
          'Link must be a valid url',
          'slug cannot be updated',
          'id cannot be updated',
          'uuid cannot be updated',
          'external cannot be updated',
        ],
      });
    });

    it('should respond with 400 if parameter is not valid', () => {
      const req = {
        params: {
          slug: 'title-XXXXXXXXXX',
        },
        body: {
          body: '=body*',
          title: ')(',
          authors: '#123',
          category: 'user',
          link: 'https://link.jpg',
          imageUrl: 'image',
          slug: 'slug',
        },
      };
      const next = jest.fn();

      ArticlesMiddleware.validateUpdateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid request parameter',
        possibleCauses: [
          'An article cannot have a body and link at the same time',
        ],
      });
    });
  });
});
