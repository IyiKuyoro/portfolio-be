import { Router } from 'express';

import FilesController from '../controllers/FilesController';

const fileRouter = Router();

fileRouter.get(
  '/cv',
  FilesController.getCV,
);

export default fileRouter;
