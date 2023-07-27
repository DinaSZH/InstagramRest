const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Post = require("../post/models/Post");
const User = require("../auth/User");

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
Post.hasMany(Comment, {foreignKey: 'postId', as: "comment"}); 

module.exports = Comment;