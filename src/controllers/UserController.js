import RespondEx from '@respondex/core';
import ApiError from '@respondex/apierror';
import bcrypt from 'bcrypt';

import UserService from '../services/UserService';
import TokenHelper from '../helpers/TokenHelper';

export default class UserController {
  static async signIn(req, res) {
    try {
      const user = await UserService.getUserByUserNameOrEmail(req.body.userName);

      if (user !== null && await bcrypt.compareSync(req.body.password, user.password)) {
        const data = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
        };
        RespondEx.successWithData('Signin successful', {
          ...data,
          token: TokenHelper.generateToken(data, '24h'),
        }, res);
      } else {
        throw new ApiError('Authorization error',
          [
            'User with this email or userName not found',
            'Password is incorrect',
          ],
          401);
      }
    } catch (error) {
      if (!error.code || error.code === 500) {
        RespondEx.errorByType('ServerError', res);
      } else {
        RespondEx.error(error, res);
      }
    }
  }
}
