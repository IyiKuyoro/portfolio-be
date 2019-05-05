import model from '../../database/models';
import UserService from '../UserService';

const { User } = model;

describe('UserService', () => {
  describe('getUserByUserNameOrEmail', () => {
    it('should throw an error if one occurs.', async (done) => {
      try {
        jest.spyOn(User, 'findOne')
          .mockImplementation(() => {
            throw new Error();
          });

        await UserService.getUserByUserNameOrEmail('username');
      } catch (error) {
        expect(error.message).toEqual('Server error has occurred');
        done();
      }
    });

    it('should return user if not error occurs', async () => {
      jest.spyOn(User, 'findOne')
        .mockImplementation(() => ({
          user: 'user',
        }));

      const user = await UserService.getUserByUserNameOrEmail('username');

      expect(user).toEqual({
        user: 'user',
      });
    });
  });
});
