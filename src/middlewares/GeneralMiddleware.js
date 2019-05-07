import RespondEx from '@respondex/core';
import ApiError from '@respondex/apierror';

class Helpers {
  static validateParams(obj) {
    const errors = [];
    const props = ['page', 'count'];

    props.forEach((param) => {
      if (Number.isNaN(+obj[param]) || +obj[param] <= 0) {
        errors.push(`${param} must be a number greater than zero`);
      }
    });

    return errors;
  }
}

export default class GeneralMiddleware {
  static validatePaginationParams(req, res, next) {
    try {
      if (!req.query.page) {
        req.query.page = 1;
      }
      if (!req.query.count) {
        req.query.count = 10;
      }

      const errors = Helpers.validateParams(req.query);

      if (errors.length > 0) {
        throw new ApiError(
          'Invalid query parameters',
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
