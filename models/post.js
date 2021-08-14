'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models['User'], {foreignKey: 'userId'});
      Post.hasMany(models['PostLike']);
      Post.hasMany(models['Comment']);
    }
  }

  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      post: DataTypes.STRING,
      totalLikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalComments: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      defaultScope: {
        where: { deleted: false },
      },
      modelName: 'Post',
    }
  );

  return Post;
};