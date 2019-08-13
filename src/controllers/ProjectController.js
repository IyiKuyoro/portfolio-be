import RespondEx from '@respondex/core';

import ProjectService from '../services/ProjectService';
import config from '../config';
import logger from '../logger';

export default class ProjectController {
  static async addProject(req, res) {
    try {
      const project = {};
      project.title = req.body.title;
      project.language = req.body.language;
      project.description = req.body.description;
      project.link = req.body.link;
      project.host = req.body.host;

      const newProject = await ProjectService.addNewProject(project);

      RespondEx.createdResource(
        'New Project created',
        { ...newProject },
        `${config.URL}/api/v1/project/${newProject.id}`,
        res,
      );
    } catch (error) {
      logger.log('error', error.message, error);
      RespondEx.error(error, res);
    }
  }
}
