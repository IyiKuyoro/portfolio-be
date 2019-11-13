import { Router } from 'express';
import multer from 'multer';

import ImagesController from '../controllers/ImagesController';
import ImagesMiddleware from '../middlewares/ImagesMiddleware';

const imageRouter = Router();
const storage = multer.memoryStorage();

imageRouter.delete(
  '/',
  ImagesMiddleware.validatePublicId,
  ImagesController.destroy,
);

const upload = multer({ storage }).single('image');
imageRouter.use(upload); // Set upload limit and file name
imageRouter.post(
  '/upload',
  ImagesMiddleware.validateImageParams,
  ImagesController.uploadImage,
);

export default imageRouter;
