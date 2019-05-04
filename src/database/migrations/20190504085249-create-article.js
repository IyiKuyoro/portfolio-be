module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    uuid: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    slug: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    authors: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    category: {
      allowNull: false,
      defaultValue: 'tech',
      type: Sequelize.ENUM('tech', 'inspirational', 'others'),
    },
    imageUrl: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    link: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    body: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
    external: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
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
  down: queryInterface => queryInterface.dropTable('Articles'),
};
