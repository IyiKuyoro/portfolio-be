module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    category: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['tech', 'inspirational', 'others'],
      defaultValue: 'tech',
    },
    imageUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    imagePublicId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    link: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    body: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    external: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  }, {});
  Article.associate = (models) => {
    Article.belongsToMany(models.User,
      {
        as: 'allAuthors',
        through: 'ArticleAuthor',
        foreignKey: 'articleId',
      });
  };
  return Article;
};
