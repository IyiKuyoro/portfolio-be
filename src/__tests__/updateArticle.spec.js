import request from 'supertest';
import uuidv1 from 'uuid/v1';

import app from '../app';
import model from '../database/models';
import TokenHelper from '../helpers/TokenHelper';

const { User, Article } = model;

describe('', () => {
  let admin;
  let adminToken;
  let article;

  beforeAll(async () => {
    admin = await User.create({
      firstName: 'test',
      lastName: 'admin',
      email: 'test.admin2@test.com',
      userName: 'testAdmin2',
      password: 'IAmATestAdmin',
      role: 'admin',
    });
    adminToken = TokenHelper.generateToken({
      firstName: 'test',
      lastName: 'admin',
      email: 'test.admin2@test.com',
      userName: 'testAdmin2',
    }, '1h');
    article = await Article.create({
      uuid: uuidv1(),
      title: 'title',
      slug: 'title2',
      authors: ['author'],
      category: 'tech',
      body: 'Body.',
      external: false,
    });
  });

  it('should update the article', async (done) => {
    request(app)
      .put(`/api/v1/articles/${article.slug}`)
      .set(
        'Cookie',
        [`Authorization=${adminToken}`],
      )
      .send({
        body: 'New Body.',
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should respond with 404 if article was not found', async (done) => {
    request(app)
      .put('/api/v1/articles/slug')
      .set(
        'Cookie',
        [`Authorization=${adminToken}`],
      )
      .send({
        body: 'New Body.',
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  afterAll(async () => {
    await admin.destroy();
    await article.destroy();
  });
});
