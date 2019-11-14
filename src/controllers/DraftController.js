import RespondEx from '@respondex/core';
import ApiError from '@respondex/apierror';

export default class DraftController {
  static async createDraft(req, res) {
    try {
      throw Error('Not Implemented');
    } catch (error) {
      RespondEx.error(error, res);
    }
  }
}
