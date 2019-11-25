module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Articles', 'imagePublicId', Sequelize.STRING),

  down: queryInterface => queryInterface.removeColumn('Articles', 'imagePublicId'),
};
