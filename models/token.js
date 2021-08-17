'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
    }
  }

  Token.init({
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    jwt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Token',
    defaultValue: {
      where: { expired: false }
    }
  });
  return Token;
};