import request from 'supertest';

import app from '../app';
import model from '../database/models';

const { User } = model;

describe('signIn', () => {
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      firstName: 'test',
      lastName: 'user',
      email: 'test.user@test.com',
      userName: 'testUser',
      password: 'IAmATestUser',
    });
  });

  it('should respond with user data', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        userName: 'testUser',
        password: 'IAmATestUser',
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  afterAll(async () => {
    await testUser.destroy();
  });
});
