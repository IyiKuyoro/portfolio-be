import ApiError from '@respondex/apierror';
import RespondEx from '@respondex/core';

import GeneralValidators from '../helpers/GeneralValidators';

class Helper {
  static checkPassedProperties(props, errors, req) {
    props.forEach((prop) => {
      switch (prop) {
        case 'body':
          Helper.validateBody(errors, req.body.body);
          req.body.link = null;
          break;
        case 'title':
          Helper.validateTitle(errors, req.body.title);
          break;
        case 'authors':
          Helper.validateAuthors(errors, req.body.authors);
          req.body.authors = req.body.authors.split(', ');
          break;
        case 'category':
          Helper.validateCategory(errors, req.body.category);
          break;
        case 'imageUrl':
          Helper.validateLink(errors, req.body.imageUrl, true);
          break;
        case 'link':
          Helper.validateLink(errors, req.body.link);
          req.body.body = null;
          break;
        case 'slug':
          errors.push('slug cannot be updated');
          break;
        case 'id':
          errors.push('id cannot be updated');
          break;
        case 'uuid':
          errors.push('uuid cannot be updated');
          break;
        case 'external':
          errors.push('external cannot be updated');
          break;
        default:
          break;
      }
    });
  }

  static checkForAtLeastOneProp(props) {
    if (props.length <= 0) {
      throw new ApiError('Incomplete request parameters', [
        'You have to pass at least one parameter to be updated',
      ], 400);
    }
  }

  static validateSlug(slug) {
    const regex = /^[a-zA-Z0-9:!-]+$/;

    if (!regex.test(slug)) {
      throw new ApiError(
        'Invalid url parameter',
        [
          'The slug passed may be in the wrong format',
        ],
        400,
      );
    }
  }

  static validateTitle(errors, title) {
    const regex = /^[ a-zA-Z0-9:!'-]+$/;

    if (!regex.test(title)) {
      errors.push('Titles can only contain the following dataset: [ a-zA-Z0-9:!-]');
    }
  }

  static validateAuthors(errors, authors) {
    const regex = /^[ a-zA-Z',-]+$/;

    if (!regex.test(authors)) {
      errors.push('Authors can only contain the following dataset: [ a-zA-Z\'-,]');
    }
  }

  static validateCategory(errors, category) {
    const allowedValues = ['tech', 'inspirational', 'others'];

    if (allowedValues.indexOf(category) < 0) {
      errors.push('Category only be one of the following [\'tech\', \'inspirational\', \'others\']');
    }
  }

  static validateBody(errors, body) {
    const regex = /^[a-zA-Z0-9]{1}[\s\S]+[.!?]$/;

    if (!regex.test(body)) {
      errors.push('Article body must start with the following character set [a-zA-Z0-9]');
      errors.push('Article body must end with the following character set [.!?]');
    }
  }

  static validateLink(errors, link, image = false) {
    const regex = image ? /^http[s]?:\/\/.+\.(png||jpg||jpeg||gif)$/ : /^http[s]?:\/\/.+\.[\w]+$/;

    if (!regex.test(link)) {
      if (image) {
        errors.push('Link must be a valid image url');
      } else {
        errors.push('Link must be a valid url');
      }
    }
  }
}

export default class ArticlesMiddleware {
  static validateParams(req, res, next) {
    try {
      const errors = GeneralValidators.validateProps(req.body, 'title', 'authors', 'category');
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
      Helper.validateAuthors(errors, req.body.authors);
      Helper.validateCategory(errors, req.body.category);
      if (!req.body.body) {
        Helper.validateLink(errors, req.body.link);
      }

      if (req.body.imageUrl) {
        Helper.validateLink(errors, req.body.imageUrl, true);
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
