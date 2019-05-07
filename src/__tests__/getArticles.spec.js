import request from 'supertest';
import uuidv1 from 'uuid/v1';

import app from '../app';
import model from '../database/models';

const { Article } = model;

describe('GetArticles-Integration_Tests', () => {
  beforeAll(async () => {
    await Article.create({
      uuid: uuidv1(),
      title: 'title',
      slug: 'title1',
      authors: ['author'],
      category: 'tech',
      body: 'Body.',
      external: false,
    });
    await Article.create({
      uuid: uuidv1(),
      title: 'title',
      slug: 'title2',
      authors: ['author'],
      category: 'tech',
      body: 'Body.',
      external: false,
    });
    await Article.create({
      uuid: uuidv1(),
      title: 'title',
      slug: 'title3',
      authors: ['author'],
      category: 'tech',
      body: 'Body.',
      external: false,
    });
    await Article.create({
      uuid: uuidv1(),
      title: 'title',
      slug: 'title4',
      authors: ['author'],
      category: 'tech',
      body: 'Body.',
      external: false,
    });
    await Article.create({
      uuid: uuidv1(),
      title: 'title',
      slug: 'title5',
      authors: ['author'],
      category: 'tech',
      body: 'Body.',
      external: false,
    });
  });

  it('should get all articles on page 1', (done) => {
    request(app)
      .get('/api/v1/articles')
      .query({
        page: 1,
        count: 1,
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should throw error if one occurs', (done) => {
    request(app)
      .get('/api/v1/articles')
      .query({
        page: 'one',
        count: 'ten',
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});
