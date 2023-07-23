const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db"); // importing settings for connection to db
const Post = require("./Post");

const PostContent = sequelize.define("PostContent", {
    content_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

PostContent.belongsTo(Post, { foreignKey: "postId" });

Post.hasMany(PostContent, {foreignKey: 'postId', as: "postContent"}); 

module.exports = PostContent;