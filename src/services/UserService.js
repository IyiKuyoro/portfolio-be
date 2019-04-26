import { Op } from 'sequelize';
import ApiError from '@respondex/apierror';

import model from '../database/models';

const { User } = model;

export default class UserService {
  static async getUserByUserNameOrEmail(userNameOrEmail, raw = true) {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
        },
        raw,
      });

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
