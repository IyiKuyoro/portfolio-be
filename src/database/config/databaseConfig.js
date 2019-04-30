const config = require('../../config');

module.exports = {
  development: {
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE,
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    dialect: 'postgres',
  },
  test: {
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE,
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    dialect: 'postgres',
  },
  production: {
    username: config.DATABASE_USERNAME,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE,
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    dialect: 'postgres',
  },
};
