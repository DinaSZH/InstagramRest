const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Post = require("../post/models/Post");
const User = require("../auth/User");

const Like = sequelize.define("Like", {
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

Like.belongsTo(Post, { foreignKey: "postId" });
Like.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Like, {foreignKey: 'postId', as: "like"}); 
module.exports = Like;