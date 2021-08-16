'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models['Post']);
      User.hasMany(models['PostLike']);
      User.hasMany(models['Comment']);
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
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] }
        }
      },
      modelName: 'User',
    }
  );

  return User;
};