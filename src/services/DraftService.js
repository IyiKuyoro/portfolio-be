import logger from '../logger';
import model from '../database/models';

const { Draft } = model;

export default class DraftService {
  static async upsertDraft(draftParams) {
    try {
      const draft = await Draft.upsert({
        title: draftParams.title,
        authors: draftParams.authors,
        imageUrl: draftParams.imageUrl,
        body: draftParams.body,
      },
      {
        where: {
          title: draftParams.title,
        },
        returning: true,
      });

      return draft;
    } catch (error) {
      logger.log('error', error.message, error);
      throw error;
    }
  }
}
