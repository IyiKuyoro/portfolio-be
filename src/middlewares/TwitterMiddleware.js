import TokenHelper from '../helpers/TokenHelper';

export default class TwitterMiddleware {
  static challengeResponseCheck(req, res, next) {
    if (req.query.crc_token) {
      res.status(200).json({
        response_token: `sha256=${TokenHelper.generateCRCToken(req.query.crc_token)}`,
      });

      return;
    }

    next();
  }
}
