import RespondEx from '@respondex/core';

import DraftService from '../services/DraftService';

export default class DraftController {
  static async createDraft(req, res) {
    try {
      const draft = await DraftService.upsertDraft({
        title: req.body.title,
        authors: [`${req.userData.firstName} ${req.userData.lastName}`],
        imageUrl: req.body.imageUrl,
        body: req.body.body,
      });

      RespondEx.successWithData(
        'Draft created',
        {
          title: draft[0].dataValues.title,
          authors: draft[0].dataValues.authors,
          imageUrl: draft[0].dataValues.imageUrl,
          body: draft[0].dataValues.body,
        },
        res,
      );
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
