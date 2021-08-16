'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models['Post']);
      Comment.belongsTo(models['User']);
    }
  }

  Comment.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    comment: DataTypes.STRING,
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
    modelName: 'Comment',
  });
  return Comment;
};