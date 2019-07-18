import axios from 'axios';
import crypto from 'crypto';
import uuid from 'uuid/v1';
import encode from 'encode-3986';

import config from '../config';

class Helper {
  static generateAuthString(method, baseUrl, parameter, oauthParams) {
    const signature = this.generateSignature(method, baseUrl, parameter, oauthParams);
    const completeOAuthParams = {
      oauth_consumer_key: oauthParams.oauth_consumer_key,
      oauth_nonce: oauthParams.oauth_nonce,
      oauth_signature: signature,
      oauth_signature_method: oauthParams.oauth_signature_method,
      oauth_timestamp: oauthParams.oauth_timestamp,
      oauth_token: oauthParams.oauth_token,
      oauth_version: oauthParams.oauth_version,
    };

    let authString = 'OAuth ';
    const params = Object.keys(completeOAuthParams);
    params.forEach((param) => {
      authString += `${encode(param)}="${encode(completeOAuthParams[param])}", `;
    });
    authString = authString.replace(/, $/, '');

    return authString;
  }

  static generateSignature(method, baseUrl, parameter, oauthParams) {
    const methodCapitalized = method.toUpperCase();

    const params = Object.keys(oauthParams);
    const sortedParams = params.sort();

    let parameterString = '';
    sortedParams.forEach((param) => {
      parameterString += `${encode(param)}=${encode(oauthParams[param])}&`;
    });
    parameterString += `${encode('url')}=${encode(parameter)}`;

    const signatureBaseString = `${methodCapitalized}&${encode(baseUrl)}&${encode(parameterString)}`;
    const signingKey = `${encode(config.TWITTER_API_SECRETE_KEY)}&${encode(config.TWITTER_TOKEN_SECRETE)}`;
    const hmac = crypto.createHmac('sha1', signingKey);
    hmac.update(signatureBaseString);

    return hmac.digest('base64');
  }
}

export default class TwitterController {
  static async addWebhook(req, res) {
    const webhookUrl = encodeURI(req.body.url);
    let once = uuid();
    once = once.replace(/-/gi, '');

    const oauth1Params = {
      oauth_consumer_key: config.TWITTER_API_KEY,
      oauth_nonce: once,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_token: config.TWITTER_ACCESS_TOKEN,
      oauth_version: '1.0',
    };

    const auth = Helper.generateAuthString(
      'POST',
      'https://api.twitter.com/1.1/account_activity/all/prod/webhooks.json',
      webhookUrl,
      oauth1Params,
    );

    try {
      const response = await axios.get(
        `https://api.twitter.com/1.1/account_activity/all/prod/webhooks.json?url=${webhookUrl}`,
        {
          headers: {
            Authorization: auth,
          },
        },
      );

      console.log();
      console.log(response.response.data);
      res.status(500).json(response.response.data);
      console.log();
    } catch (error) {
      console.log();
      console.log(error.response.data);
      res.status(500).json(error.response.data);
      console.log();
    }
  }
}
