import ApiError from '@respondex/apierror';
import RespondEx from '@respondex/core';
import jwt from 'jsonwebtoken';

import config from '../config';
import GeneralValidators from '../helpers/GeneralValidators';
import UserService from '../services/UserService';

class Helpers {
  static nullUser(user) {
    if (user === null) {
      throw new ApiError('Unauthorized access', ['User not signed in'], 401);
    }
  }

  static checkAdmin(user) {
    const allowedRoles = ['admin', 'super-admin'];
    if (allowedRoles.indexOf(user.role) < 0) {
      throw new ApiError('Restricted access', ['User may not have the required access level for this resource'], 403);
    }
  }
}

export default class AuthMiddleware {
  static validateParams(req, res, next) {
    try {
      const errors = GeneralValidators.validateProps(req.body, 'userName', 'password');
      if (errors.length > 0) {
        throw new ApiError('Incomplete request params', errors, 400);
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static validateToken(req, res, next) {
    try {
      if (req.headers.authorization.indexOf('Bearer ') < 0) {
        throw new Error();
      }

      const token = req.headers.authorization.replace('Bearer ', '');
      req.userData = jwt.verify(token, config.SECRET);

      next();
    } catch (error) {
      error.code = 401;
      error.message = 'Authorization failed.';
      error.possibleCauses = [
        'You may not be signed in',
      ];
      RespondEx.error(error, res);
    }
  }

  static async validateAdmin(req, res, next) {
    try {
      const user = await UserService.getUserByUserNameOrEmail(req.userData.email);

      Helpers.nullUser(user);
      Helpers.checkAdmin(user);

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
