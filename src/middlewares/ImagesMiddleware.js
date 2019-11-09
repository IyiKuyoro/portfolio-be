import RespondEx from '@respondex/core';
import ApiError from '@respondex/apierror';
import Datauri from 'datauri';

const datauri = new Datauri();

class Images {
  static validateImageParams(req, res, next) {
    try {
      if (!req.file) {
        throw new ApiError(
          'Incomplete params.',
          ['Please provide the file to be uploaded'],
          400,
        );
      }
      if (!req.body.fileName) {
        throw new ApiError(
          'Incomplete params.',
          ['Please provide the fileName'],
          400,
        );
      }

      let ext = req.file.originalname.split('.');
      ext = `.${ext[1]}`;
      const file = datauri.format(ext, req.file.buffer);
      req.file = file;

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static validatePublicId(req, res, next) {
    try {
      if (!req.query.publicId) {
        throw new ApiError(
          'Incomplete params.',
          ['Please provide the image publicID as a query parameter'],
          400,
        );
      }

      next();
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}

export default Images;
