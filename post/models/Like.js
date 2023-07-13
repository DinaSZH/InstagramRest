const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db"); // importing settings for connection to db
const Post = require("./Post");
const User = require("../../app/auth/User");

const Like = sequelize.define("Like", {
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

Like.belongsTo(Post, { foreignKey: "postId" });
Like.belongsTo(User, { foreignKey: "userId" });

module.exports = Like;