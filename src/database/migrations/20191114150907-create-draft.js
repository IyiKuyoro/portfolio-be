module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Drafts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    body: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    authors: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Drafts'),
};
