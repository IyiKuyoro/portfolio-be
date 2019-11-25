import request from 'supertest';

import app from '../app';
import model from '../database/models';
import TokenHelper from '../helpers/TokenHelper';

const { User } = model;

describe('CreateArticle', () => {
  let testUser;
  let testAdmin;
  let adminToken;

  beforeAll(async () => {
    testUser = await User.create({
      firstName: 'test',
      lastName: 'user',
      email: 'test.user1@test.com',
      userName: 'testUser1',
      password: 'IAmATestUser',
    });
    testAdmin = await User.create({
      firstName: 'test',
      lastName: 'admin',
      email: 'test.admin1@test.com',
      userName: 'testAdmin1',
      password: 'IAmATestAdmin',
      role: 'admin',
    });
    adminToken = TokenHelper.generateToken({
      firstName: 'test',
      lastName: 'admin',
      email: 'test.admin1@test.com',
      userName: 'testAdmin1',
    }, '1h');
  });

  it('should respond with an authorization error', (done) => {
    request(app)
      .post('/api/v1/articles')
      .set({
        authorization: 'AuthorizationXXXXXXXXX',
      })
      .send()
      .expect('Content-Type', /json/)
      .expect(401, {
        success: false,
        message: 'Authorization failed.',
        possibleCauses: [
          'You may not be signed in',
        ],
      }, done);
  });

  it('should respond unauthorized if user is not found', (done) => {
    const token = TokenHelper.generateToken({
      email: 'no.user@test.com',
      firstName: 'no',
      lastName: 'user',
      userName: 'noUser',
    }, '1h');

    request(app)
      .post('/api/v1/articles')
      .set({
        authorization: `Bearer ${token}`,
      })
      .send()
      .expect('Content-Type', /json/)
      .expect(401, {
        success: false,
        message: 'Unauthorized access',
        possibleCauses: [
          'User not signed in',
        ],
      }, done);
  });

  it('should respond with restricted access', (done) => {
    const token = TokenHelper.generateToken({
      email: 'test.user1@test.com',
      firstName: 'test',
      lastName: 'user',
      userName: 'testUser',
    }, '1h');

    request(app)
      .post('/api/v1/articles')
      .set({
        authorization: `Bearer ${token}`,
      })
      .send()
      .expect('Content-Type', /json/)
      .expect(403, {
        success: false,
        message: 'Restricted access',
        possibleCauses: [
          'User may not have the required access level for this resource',
        ],
      }, done);
  });

  it('should respond with incomplete parameters', (done) => {
    request(app)
      .post('/api/v1/articles')
      .set({
        authorization: `Bearer ${adminToken}`,
      })
      .send()
      .expect('Content-Type', /json/)
      .expect(400, {
        success: false,
        message: 'Incomplete request params',
        possibleCauses: [
          'title not provided',
          'category not provided',
          'body or link not both should be provided',
        ],
      }, done);
  });

  it('should respond with invalid data', (done) => {
    request(app)
      .post('/api/v1/articles')
      .set({
        authorization: `Bearer ${adminToken}`,
      })
      .send({
        title: '#*',
        authors: '\'1 = 1;!Josh, Mack@',
        category: 'user',
        link: 'wrongLink',
      })
      .expect('Content-Type', /json/)
      .expect(400, {
        success: false,
        message: 'Invalid parameters',
        possibleCauses: [
          'Titles can only contain the following dataset: [ a-zA-Z0-9:!-]',
          'Category only be one of the following [\'tech\', \'inspirational\', \'others\']',
          'Link must be a valid url',
        ],
      }, done);
  });

  it('should respond with invalid data', (done) => {
    request(app)
      .post('/api/v1/articles')
      .set({
        authorization: `Bearer ${adminToken}`,
      })
      .send({
        title: 'title',
        authors: '\'1 = 1;!Josh, Mack@',
        category: 'user',
        link: 'wrongLink',
      })
      .expect('Content-Type', /json/)
      .expect(400, {
        success: false,
        message: 'Invalid parameters',
        possibleCauses: [
          'Category only be one of the following [\'tech\', \'inspirational\', \'others\']',
          'Link must be a valid url',
        ],
      }, done);
  });

  it('should create a new article', (done) => {
    request(app)
      .post('/api/v1/articles')
      .set({
        authorization: `Bearer ${adminToken}`,
      })
      .send({
        title: 'title',
        authors: 'author, author',
        category: 'tech',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo nulla, vulputate eu euismod ut, mattis ut nulla. Nullam tempus volutpat tortor, in eleifend urna luctus ut. Ut lobortis, libero eget dignissim volutpat, enim odio facilisis elit, at varius tellus tellus eu turpis. Ut pharetra arcu ut orci tristique, sit amet dapibus augue finibus. Praesent lobortis est sed nunc ultrices, at tristique velit semper. Etiam nec cursus mi. Mauris nec nunc sodales urna luctus dapibus a quis dolor. Phasellus et suscipit ante. Donec auctor convallis odio vel congue. Suspendisse accumsan ut libero eu rhoncus.\n\nNulla vel porta nunc. Donec efficitur maximus turpis, consectetur dapibus justo vehicula vel. Vestibulum ut varius nibh, sed iaculis odio. Nullam libero tellus, accumsan sit amet suscipit id, luctus quis mauris. Nulla imperdiet, risus nec tristique ultrices, nisi arcu aliquam dolor, in ultrices ligula erat id leo. Aliquam metus urna, congue id gravida at, dignissim ut dolor. Fusce odio ante, imperdiet luctus nunc a, dignissim pharetra enim. Donec auctor porttitor eros, at consectetur dui tincidunt a. In hac habitasse platea dictumst. Nullam justo orci, lobortis fermentum tellus a, vestibulum efficitur magna. Sed auctor elit eu urna dapibus, sed tincidunt risus lobortis. Aliquam gravida non tellus id blandit. Pellentesque nec mi sollicitudin, maximus mauris sit amet, hendrerit libero. In euismod vitae odio non cursus. Aliquam urna mi, congue imperdiet dolor non, lacinia elementum sapien. Aenean ac turpis facilisis, ultricies magna vel, tempus risus.\n\nDonec ut odio velit. Maecenas ultrices urna ac lorem suscipit pretium. Nullam luctus metus massa, ut sagittis sem feugiat sit amet. Aliquam semper pharetra neque a sodales. Etiam cursus dolor quis venenatis interdum. Nunc sollicitudin ac ante eget tempus. Nam porta mi eu blandit semper. In vitae pharetra nunc, ut mattis arcu. Aenean ac lacus ligula. Cras dapibus varius porttitor. Nulla iaculis turpis lectus, nec finibus nulla blandit a. Curabitur id tortor turpis. Aenean velit magna, varius quis iaculis quis, rhoncus nec tellus. Aliquam rutrum tempus metus, nec tempus mauris cursus non. Aliquam semper iaculis nibh efficitur posuere.\n\nProin erat nisi, tempor sit amet suscipit in, imperdiet at ipsum. Suspendisse pretium porta lacus molestie finibus. Duis maximus tempus nunc, eget finibus quam facilisis sit amet. Vivamus hendrerit ac eros vel pulvinar. Nam non elit tincidunt, euismod nisi a, lobortis justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et mollis nunc, in commodo dui. Donec sapien erat, volutpat vitae nibh sed, faucibus gravida risus. In ultricies eros sollicitudin, tempor leo ac, molestie tellus. Etiam sed lacinia leo. Nunc molestie ligula diam, vitae varius felis consectetur et.\n\nNunc vitae pretium dolor, at pulvinar magna. Proin eget leo egestas turpis dictum volutpat quis eget risus. Curabitur eu euismod nunc, ac maximus leo. Integer in tortor vehicula, congue erat rutrum, interdum nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla viverra libero ut enim finibus consectetur. Proin id lorem dui. Nunc rutrum eros eget velit posuere scelerisque. Suspendisse vel vehicula felis. Proin a lorem mollis, dictum ligula nec, fringilla felis. Mauris pretium tincidunt tempor.',
      })
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  afterAll(async () => {
    await testUser.destroy();
    await testAdmin.destroy();
  });
});
