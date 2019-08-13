import ApiError from '@respondex/apierror';

import logger from '../logger';
import model from '../database/models';

const { Project } = model;

export default class ProjectService {
  static async addNewProject(project) {
    try {
      const projectRecord = await Project.findOrCreate({
        where: {
          title: project.title,
        },
        defaults: {
          title: project.title,
          language: project.language,
          description: project.description,
          link: project.link,
          host: project.host,
        },
      });

      if (projectRecord[1] === false) {
        throw new ApiError('Project already exists', [], 409);
      }

      return projectRecord[0].dataValues;
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }
}
