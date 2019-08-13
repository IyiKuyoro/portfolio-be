

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
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
    language: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    host: {
      type: DataTypes.STRING,
    },
    link: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  Project.associate = () => {
    // associations can be defined here
  };
  return Project;
};
