import ApiError from '@respondex/apierror';
import RespondEx from '@respondex/core';

import GeneralValidators from '../helpers/GeneralValidators';

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
}
