'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLike extends Model {
    static associate(models) {
      PostLike.belongsTo(models['Post']);
      PostLike.belongsTo(models['User']);
    }
  }

  PostLike.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    PostId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Posts',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    UserId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'PostLike',
  });
  return PostLike;
};