import bcrypt from 'bcrypt';

import UserController from '../UserController';
import UserService from '../../services/UserService';
import ResMock from '../../__mocks__/ResMock';

describe('UserController', () => {
  describe('signIn()', () => {
    let res;
    let status;
    let json;
    let cookie;

    beforeEach(() => {
      res = new ResMock();
      status = jest.spyOn(res, 'status');
      json = jest.spyOn(res, 'json');
      cookie = jest.spyOn(res, 'cookie');
    });

    it('should respond with an authorization error when one occurs', async () => {
      jest.spyOn(UserService, 'getUserByUserNameOrEmail')
        .mockImplementation(() => null);
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);
      const req = {
        body: {
          username: 'username',
          password: 'password',
        },
      };

      await UserController.signIn(req, res);

      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'Authorization error',
        possibleCauses: [
          'User with this email or userName not found',
          'Password is incorrect',
        ],
      });
    });

    it('should respond with server error if one occurs', async () => {
      jest.spyOn(UserService, 'getUserByUserNameOrEmail')
        .mockImplementation(() => null);
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);
      const req = {};

      await UserController.signIn(req, res);

      expect(status).toHaveBeenCalledWith(500);
      expect(json).toHaveBeenCalledWith({
        success: false,
        message: 'A server error has occurred! Please contact the administrator',
        possibleCauses: [
          'This error is caused by a malfunction in this application',
        ],
      });
    });

    it('should respond with success data', async () => {
      jest.spyOn(UserService, 'getUserByUserNameOrEmail')
        .mockImplementation(() => ({
          email: 'email',
          firstName: 'firstName',
          lastName: 'lastName',
          userName: 'userName',
        }));
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);
      const req = {
        body: {
          username: 'username',
          password: 'password',
        },
      };

      await UserController.signIn(req, res);

      expect(cookie).toHaveBeenCalledTimes(1);
      expect(status).toHaveBeenCalledWith(200);
      expect(json).toHaveBeenCalledWith({
        success: true,
        message: 'Signin successful',
        data: {
          email: 'email',
          firstName: 'firstName',
          lastName: 'lastName',
          userName: 'userName',
        },
      });
    });
  });
});
