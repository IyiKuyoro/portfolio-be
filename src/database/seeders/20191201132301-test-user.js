const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstName: 'Test',
    lastName: 'User',
    userName: 'testuser',
    password: bcrypt.hashSync('password', 10),
    email: 'user@test.com',
    role: 'super-admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
