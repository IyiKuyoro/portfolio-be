import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import ProjectMiddleware from '../middlewares/ProjectMiddleware';
import ProjectController from '../controllers/ProjectController';

const projectRouter = Router();

// Access middlewares
projectRouter.use(
  AuthMiddleware.validateToken,
  AuthMiddleware.validateAdmin,
);

// Add new project
projectRouter.post(
  '/',
  ProjectMiddleware.validateProjectParams,
  ProjectController.addProject,
);

export default projectRouter;
