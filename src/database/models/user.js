import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('email', val.toLowerCase());
      },
      unique: true,
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'super-admin'],
      defaultValue: 'user',
    },
  }, {});
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
