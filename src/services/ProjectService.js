import ApiError from '@respondex/apierror';

import model from '../database/models';

const { Project } = model;

export default class ProjectService {
  static async addNewProject(project) {
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
  }

  static async editProject(id, projectParams) {
    const updatedProject = await Project.update(
      {
        ...projectParams,
      },
      {
        returning: true,
        where: {
          id,
        },
      },
    );

    if (updatedProject[0] <= 0) {
      throw new ApiError(
        'Project not found',
        [
          'Perhaps the id provided is wrong',
          'Perhaps the id has been deleted',
        ],
        404,
      );
    }

    return updatedProject[1][0].dataValues;
  }

  static async getAllProjects() {
    const projects = await Project.findAll();

    return projects;
  }
}
