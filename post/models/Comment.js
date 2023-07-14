const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Post = require("./Post");
const User = require("../../app/auth/User");

const Comment = sequelize.define("Comment", {
    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

Comment.belongsTo(Post, { foreignKey: "postId" });
Comment.belongsTo(User, { foreignKey: "userId" });

module.exports = Comment;