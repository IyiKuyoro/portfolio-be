import RespondEx from '@respondex/core';
import Cloudinary from 'cloudinary';

import config from '../config';

Cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_CLOUDNAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRETE,
});

export default class ImagesController {
  static uploadImage(req, res) {
    try {
      Cloudinary.v2.uploader.upload(
        req.file.content,
        {
          public_id: req.body.fileName,
          folder: config.CLOUDINARY_FOLDER,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            RespondEx.error(error, res);
          } else {
            RespondEx.createdResource(
              'Upload successful',
              {
                imageUrl: result.url,
                publicId: result.public_id,
                version: result.version,
                signature: result.signature,
                etag: result.etag,
              },
              result.url,
              res,
            );
          }
        },
      );
    } catch (error) {
      RespondEx.error(error, res);
    }
  }

  static destroy(req, res) {
    try {
      Cloudinary.v2.uploader.destroy(
        req.query.publicId,
        {
          resource_type: 'image',
        },
        (error) => {
          if (error) {
            RespondEx.error(error, res);
          } else {
            RespondEx.successWithoutData(
              'Deleted successfully',
              res,
            );
          }
        },
      );
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
