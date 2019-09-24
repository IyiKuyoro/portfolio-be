import crypto from 'crypto';
import uuid from 'uuid/v1';
import encode from 'encode-3986';

import config from '../config';

class Helper {
  static generateAuthString(method, baseUrl, oauthParams) {
    const signature = this.generateSignature(method, baseUrl, oauthParams);
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

  static generateSignature(method, baseUrl, parameters) {
    const methodCapitalized = method.toUpperCase();

    const params = Object.keys(parameters);
    const sortedParams = params.sort();

    let parameterString = '';
    sortedParams.forEach((param) => {
      parameterString += `${encode(param)}=${encode(parameters[param])}&`;
    });
    parameterString = parameterString.replace(/&$/, '');

    const signatureBaseString = `${methodCapitalized}&${encode(baseUrl)}&${encode(parameterString)}`;
    const signingKey = `${encode(config.TWITTER_API_SECRETE_KEY)}&${encode(config.TWITTER_TOKEN_SECRETE)}`;
    const hmac = crypto.createHmac('sha1', signingKey);
    hmac.update(signatureBaseString);

    return hmac.digest('base64');
  }

  static generateParamsObject(oauth1Params, urlParams) {
    const oauthParamKeys = Object.keys(oauth1Params);
    const urlParamsKeys = Object.keys(urlParams);

    const unifiedParamKeys = [...oauthParamKeys, ...urlParamsKeys];
    unifiedParamKeys.sort();

    const paramsObject = {};
    unifiedParamKeys.forEach((param) => {
      if (param !== 'twitterEndpoint' && param !== 'method') {
        if (oauth1Params[param]) {
          paramsObject[param] = oauth1Params[param];
        } else if (urlParams[param]) {
          paramsObject[param] = urlParams[param];
        }
      }
    });

    return paramsObject;
  }

  static generateTwitterUrl(endpoint, paramsObject) {
    const paramsKey = Object.keys(paramsObject);
    let urlString = `${endpoint}?`;

    paramsKey.forEach((param) => {
      if (param !== 'twitterEndpoint' && param !== 'method') {
        urlString += `${param}=${encode(paramsObject[param])},`;
      }
    });
    urlString = urlString.replace(/,$/, '');

    return urlString;
  }
}

export default class TwitterController {
  static logActivity(req, res) {
    res.status(200).json({});
  }

  static generateRequest(req, res) {
    try {
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

      const params = Helper.generateParamsObject(oauth1Params, req.body);
      const twitterUrl = Helper.generateTwitterUrl(req.body.twitterEndpoint, req.body);

      const auth = Helper.generateAuthString(
        req.body.method,
        req.body.twitterEndpoint,
        params,
      );

      res.status(200).send(`curl --request ${req.body.method.toUpperCase()} --url '${twitterUrl}' --header 'authorization: ${auth}'`);
    } catch (error) {
      res.status(500).send('Error');
    }
  }
}
