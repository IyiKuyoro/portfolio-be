import ResMock from '../../__mocks__/ResMock';
import AuthMiddleware from '../AuthMiddleware';

describe('AuthMiddleware', () => {
  describe('validateParams()', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with an error when parameters are missing', () => {
      const req = {
        body: {},
      };
      const next = jest.fn();

      AuthMiddleware.validateParams(req, res, next);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Incomplete request params',
        possibleCauses: [
          'userName not provided',
          'password not provided',
        ],
      });
    });

    it('should call the next middleware', () => {
      const req = {
        body: {
          userName: 'username',
          password: 'password',
        },
      };
      const next = jest.fn();

      AuthMiddleware.validateParams(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
