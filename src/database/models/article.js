module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
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
    authors: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
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
  Article.associate = () => {
    // associations can be defined here
  };
  return Article;
};