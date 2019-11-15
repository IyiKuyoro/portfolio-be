import ApiError from '@respondex/apierror';

export default class Helper {
  static checkPassedProperties(props, errors, req) {
    props.forEach((prop) => {
      switch (prop) {
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
          Helper.validateLink(errors, req.body.imageUrl);
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
    const regex = /^[- .a-zA-Z0-9:!']+$/;

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

  static validateLink(errors, link) {
    const regex = /^https?:\/\/\S+$/;

    if (!regex.test(link)) {
      errors.push('Link must be a valid url');
    }
  }
}
