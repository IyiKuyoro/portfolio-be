module.exports = {
  up: queryInterface => queryInterface.removeColumn('Articles', 'authors'),

  down: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'authors', Sequelize.ARRAY(Sequelize.TEXT)),
};
