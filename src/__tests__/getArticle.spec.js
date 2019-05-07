import request from 'supertest';
import uuidv1 from 'uuid/v1';

import app from '../app';
import model from '../database/models';

const { Article } = model;

describe('GetArticle - Integration_Tests', () => {
  it('should throw 404 error if article is not found', (done) => {
    request(app)
      .get('/api/v1/articles/noArticle')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('should get the article', async (done) => {
    const article = await Article.create({
      uuid: uuidv1(),
      title: 'title',
      slug: 'title1',
      authors: ['author'],
      category: 'tech',
      body: 'Body.',
      external: false,
    });

    request(app)
      .get(`/api/v1/articles/${article.slug}`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
