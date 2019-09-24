import RespondEx from '@respondex/core';
import path from 'path';

import logger from '../logger';

export default class FilesController {
  static getCV(req, res) {
    try {
      res.status(200).download(
        path.join(__dirname, '../Files/Opeoluwa Iyi-Kuyoro (CV).pdf'),
      );
    } catch (error) {
      logger.log('error', error.message, error);
      RespondEx.error(error, res);
    }
  }
}
