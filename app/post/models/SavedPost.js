const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db"); // importing settings for connection to db
const Post = require("./Post");
const User = require("../../auth/User");

const SavedPost = sequelize.define("SavedPost", {
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

SavedPost.belongsTo(Post, { foreignKey: "postId" });
SavedPost.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(SavedPost, {foreignKey: 'postId', as: "savedPost"}); 


module.exports = SavedPost ;