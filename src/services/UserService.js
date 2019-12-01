import { Op } from 'sequelize';
import ApiError from '@respondex/apierror';

import model from '../database/models';
import RedisClient from '../helpers/RedisClient';

const { User } = model;

export default class UserService {
  static async getUserByUserNameOrEmail(userNameOrEmail, raw = true) {
    try {
      const redisKey = `user:${userNameOrEmail}`;

      const data = await RedisClient.getAsync(redisKey);

      if (data) {
        return JSON.parse(data);
      }
      const user = await User.findOne({
        where: {
          [Op.or]: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
        },
        raw,
      });

      RedisClient.set(redisKey, JSON.stringify(user));
      return user;
    } catch (error) {
      throw new ApiError(
        'Server error has occurred',
        [
          'Probably not an issue with client data',
        ],
        500,
      );
    }
  }
}
