module.exports = (sequelize, DataTypes) => {
  const ArticleAuthor = sequelize.define('ArticleAuthor', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    articleId: {
      type: DataTypes.INTEGER,
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
  }, {});
  ArticleAuthor.associate = (models) => {
    ArticleAuthor.belongsTo(models.User, {
      foreignKey: 'authorId',
      targetKey: 'id',
      as: 'author',
    });
    ArticleAuthor.belongsTo(models.Article, {
      foreignKey: 'articleId',
      targetKey: 'id',
      as: 'article',
    });
  };
  return ArticleAuthor;
};
