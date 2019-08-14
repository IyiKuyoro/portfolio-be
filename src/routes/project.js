import { Router } from 'express';

import AuthMiddleware from '../middlewares/AuthMiddleware';
import ProjectMiddleware from '../middlewares/ProjectMiddleware';
import ProjectController from '../controllers/ProjectController';

const projectRouter = Router();

// Get a list of all the projects
projectRouter.get(
  '/',
  ProjectController.getProjects,
);

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

// Add new project
projectRouter.put(
  '/:id',
  ProjectMiddleware.validateEditProjectParams,
  ProjectMiddleware.validatePassedParameters,
  ProjectController.editProject,
);

export default projectRouter;
