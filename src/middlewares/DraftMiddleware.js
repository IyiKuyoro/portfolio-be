import ApiError from '@respondex/apierror';
import RespondEx from '@respondex/core';

import Helper from './Helpers';
import GeneralValidators from '../helpers/GeneralValidators';

export default class DraftMiddlewares {
  static validateParams(req, res, next) {
    try {
      const errors = GeneralValidators.validateProps(req.body, 'title', 'body');

      if (errors.length > 0) {
        throw new ApiError('Incomplete request params', errors, 400);
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static validateValues(req, res, next) {
    try {
      const errors = [];

      Helper.validateTitle(errors, req.body.title);

      if (req.body.imageUrl) {
        Helper.validateLink(errors, req.body.imageUrl);
      }

      if (errors.length > 0) {
        throw new ApiError('Invalid parameters', errors, 400);
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
