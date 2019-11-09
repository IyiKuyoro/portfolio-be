import { Router } from 'express';

import ImagesController from '../controllers/ImagesController';
import ImagesMiddleware from '../middlewares/ImagesMiddleware';

const imageRouter = Router();

imageRouter.delete(
  '/',
  ImagesMiddleware.validatePublicId,
  ImagesController.destroy,
);

imageRouter.post(
  '/upload',
  ImagesMiddleware.validateImageParams,
  ImagesController.uploadImage,
);

export default imageRouter;
