import ResMock from '../../__mocks__/ResMock';
import AuthMiddleware from '../AuthMiddleware';
import TokenHelper from '../../helpers/TokenHelper';
import UserService from '../../services/UserService';

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

  describe('validateToken', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with error if token is not valid', () => {
      const req = {
        headers: {
          authorization: 'Bearer XXXXXXXXXXXXXXXXXXX',
        },
      };
      const next = jest.fn();

      AuthMiddleware.validateToken(req, res, next);

      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Authorization failed.',
        possibleCauses: [
          'You may not be signed in',
        ],
      });
    });

    it('should call the next middleware if token is valid', () => {
      const req = {
        headers: {
          authorization: `Bearer ${TokenHelper.generateToken({
            user: 'user',
          }, '1h')}`,
        },
      };
      const next = jest.fn();

      AuthMiddleware.validateToken(req, res, next);

      expect(req.userData.user).toEqual('user');
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateAdmin', () => {
    let res;
    let status;
    let json;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
    });

    it('should respond with error if user is not found', async () => {
      const req = {
        userData: {
          email: 'john.snow@GOT.com',
        },
      };
      const next = jest.fn();
      jest.spyOn(UserService, 'getUserByUserNameOrEmail').mockImplementation(async () => null);

      await AuthMiddleware.validateAdmin(req, res, next);

      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Unauthorized access',
        possibleCauses: [
          'User not signed in',
        ],
      });
    });

    it('should respond with with error if user is not an admin', async () => {
      const req = {
        userData: {
          email: 'john.snow@GOT.com',
        },
      };
      const next = jest.fn();
      jest.spyOn(UserService, 'getUserByUserNameOrEmail').mockImplementation(async () => ({
        role: 'user',
      }));

      await AuthMiddleware.validateAdmin(req, res, next);

      expect(status).toHaveBeenCalledWith(403);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Restricted access',
        possibleCauses: [
          'User may not have the required access level for this resource',
        ],
      });
    });

    it('should call the next middleware if user is an Admin', async () => {
      const req = {
        userData: {
          email: 'john.snow@GOT.com',
        },
      };
      const next = jest.fn();
      jest.spyOn(UserService, 'getUserByUserNameOrEmail').mockImplementation(async () => ({
        role: 'admin',
      }));

      await AuthMiddleware.validateAdmin(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
