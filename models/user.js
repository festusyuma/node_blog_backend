'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
          let hashedPassword = bcrypt.hashSync(value, 10)
          this.setDataValue('password', hashedPassword)
        }
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};