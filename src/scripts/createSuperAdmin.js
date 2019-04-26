import models from '../database/models';
import logger from '../logger';
import config from '../config';

const { User } = models;

User.findOrCreate({
  where: {
    email: config.SA_EMAIL,
  },
  defaults: {
    firstName: 'Opeoluwa',
    lastName: 'Iyi-Kuyoro',
    email: config.SA_EMAIL,
    userName: config.SA_USERNAME,
    password: config.SA_PASSWORD,
    role: 'super-admin',
  },
})
  .then(() => {
    logger.log('info', 'SA created successfully');
  })
  .catch((error) => {
    logger.log('error', `Could not create SA: ${error.message}`);
  });
