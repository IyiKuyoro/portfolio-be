module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    body: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    imageUrl: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    authors: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  }, {});
  Draft.associate = () => {
    // associations can be defined here
  };
  return Draft;
};
