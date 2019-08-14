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
      const extraProps = GeneralValidators.findIncludedProps(req.body, 'title', 'language', 'description', 'link', 'host');

      if ([...missingParamsError, ...extraProps].length > 0) {
        throw new ApiError(
          'Error in request body',
          [...missingParamsError, ...extraProps],
          400,
        );
      }

      const validityErrors = Helper.checkPropertyStrings(req.body);

      if (validityErrors.length > 0) {
        throw new ApiError('Error in some parameters', validityErrors, 400);
      }

      next();
    } catch (error) {
      logger.error(error);
      RespondEx.error(error, res);
    }
  }

  static validateEditProjectParams(req, res, next) {
    try {
      const extraProps = GeneralValidators.findIncludedProps(req.body, 'title', 'language', 'description', 'link', 'host');

      if (extraProps.length > 0) {
        throw new ApiError(
          'Errors found in request body',
          extraProps,
          400,
        );
      }

      if (Object.keys(req.body).length <= 0) {
        throw new ApiError(
          'At least one valid parameter must be edited',
          400,
        );
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static validatePassedParameters(req, res, next) {
    try {
      const validityErrors = Helper.checkPropertyStrings(req.body);

      if (validityErrors.length > 0) {
        throw new ApiError('Error in some parameters', validityErrors, 400);
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static validateProjectId(req, res, next) {
    try {
      const digitRegex = /^[1-9]+[0-9]*$/;

      if (!digitRegex.test(req.params.id)) {
        throw new ApiError(
          'Project id must me a positive integer',
          [' Passed an invalid digit in the request url'],
          400,
        );
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
