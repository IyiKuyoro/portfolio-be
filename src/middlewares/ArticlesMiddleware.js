import ApiError from '@respondex/apierror';
import RespondEx from '@respondex/core';

import GeneralValidators from '../helpers/GeneralValidators';
import Helper from './Helpers';

export default class ArticlesMiddleware {
  static validateParams(req, res, next) {
    try {
      const errors = GeneralValidators.validateProps(req.body, 'title', 'category');
      if ((!req.body.body && !req.body.link)
        || (req.body.body && req.body.link)) {
        errors.push('body or link not both should be provided');
      }

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
      Helper.validateCategory(errors, req.body.category);
      if (!req.body.body) {
        Helper.validateLink(errors, req.body.link);
      }

      if (req.body.imageUrl) {
        Helper.validateLink(errors, req.body.imageUrl);
        errors.push(...GeneralValidators.validateProps(req.body, 'imagePublicId'));
      }

      if (errors.length > 0) {
        throw new ApiError('Invalid parameters', errors, 400);
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static validateSlug(req, res, next) {
    try {
      Helper.validateSlug(req.params.slug);

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static validateUpdateParams(req, res, next) {
    try {
      const props = Object.keys(req.body);
      const errors = [];

      if (props.indexOf('body') >= 0 && props.indexOf('link') >= 0) {
        throw new ApiError(
          'Invalid request parameter',
          [
            'An article cannot have a body and link at the same time',
          ],
          400,
        );
      }

      Helper.checkForAtLeastOneProp(props);
      Helper.checkPassedProperties(props, errors, req);

      if (errors.length > 0) {
        throw new ApiError(
          'Invalid request parameter',
          errors,
          400,
        );
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
