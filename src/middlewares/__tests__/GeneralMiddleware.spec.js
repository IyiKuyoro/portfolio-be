import ResMock from '../../__mocks__/ResMock';
import GeneralMiddleware from '../GeneralMiddleware';

describe('GeneralMiddleware', () => {
  describe('validatePaginationParams', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should set parameters to the default of missing', () => {
      const req = {
        query: {
        },
      };
      const next = jest.fn();

      GeneralMiddleware.validatePaginationParams(req, res, next);

      expect(req.query.page).toBe(1);
      expect(req.query.count).toBe(10);
    });

    it('should respond with error if invalid parameters are passed', () => {
      const req = {
        query: {
          page: 'one',
          count: 'ten',
        },
      };
      const next = jest.fn();

      GeneralMiddleware.validatePaginationParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid query parameters',
        possibleCauses: [
          'page must be a number greater than zero',
          'count must be a number greater than zero',
        ],
      });
    });

    it('should respond with error if negative numbers are passed', () => {
      const req = {
        query: {
          page: -1,
          count: -10,
        },
      };
      const next = jest.fn();

      GeneralMiddleware.validatePaginationParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid query parameters',
        possibleCauses: [
          'page must be a number greater than zero',
          'count must be a number greater than zero',
        ],
      });
    });

    it('should call the next middleware', () => {
      const req = {
        query: {
          page: 2,
          count: 5,
        },
      };
      const next = jest.fn();

      GeneralMiddleware.validatePaginationParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
