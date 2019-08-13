import ApiError from '@respondex/apierror';
import RespondEx from '@respondex/core';

import GeneralValidators from '../helpers/GeneralValidators';
import logger from '../logger';

class Helper {
  /**
   * @description validate the strings
   */
  static validateString(param, name) {
    const regex = /^[^+=@'!$#&*%<>""]+$/;

    if (!regex.test(param)) {
      return `${name} cannot contain these set of characters +=@'!$#&*%<>`;
    }

    return '';
  }

  /**
   * @description validate the project link
   */
  static validateLink(link) {
    const regex = /^https:\/\/\S+$/;

    if (!regex.test(link)) {
      return 'Invalid link provided';
    }

    return '';
  }

  static checkPropertyStrings(project) {
    const keys = Object.keys(project);
    const errors = [];

    keys.forEach((key) => {
      if (key !== 'link') {
        const errorMessage = Helper.validateString(project[key], key);

        if (errorMessage) {
          errors.push(errorMessage);
        }
      } else if (key === 'link') {
        const errorMessage = Helper.validateLink(project[key], key);

        if (errorMessage) {
          errors.push(errorMessage);
        }
      }
    });

    return errors;
  }
}

export default class ProjectMiddleware {
  /**
   * @description validate the project parameters to be added
   */
  static validateProjectParams(req, res, next) {
    try {
      const missingParamsError = GeneralValidators.validateProps(req.body, 'title', 'language', 'description', 'link', 'host');

      if (missingParamsError.length > 0) {
        throw new ApiError('Some parameters are missing', missingParamsError, 400);
      }

      const validityErrors = Helper.checkPropertyStrings(req.body);

      if (validityErrors.length > 0) {
        throw new ApiError('Some parameters are missing', validityErrors, 400);
      }

      next();
    } catch (error) {
      logger.error(error);
      RespondEx.error(error, res);
    }
  }
}
