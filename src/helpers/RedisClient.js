import redis from 'redis';
import bluebird from 'bluebird';
import cron from 'node-cron';

import Logger from '../logger';
import config from '../config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  url: config.REDIS_URL,
});

cron.schedule('30 * * * *', () => {
  client.flushdb(() => {
    Logger.info('Cache cleared');
  });
});
client.flushdb(() => {
  Logger.info('Cache cleared');
});

export default client;
