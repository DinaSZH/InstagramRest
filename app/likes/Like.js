const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Post = require("../post/models/Post");
const Stories = require("../stories/Stories");
const Comment = require("../comment/Comment");
const User = require("../auth/User");

const Like = sequelize.define("Like", {
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

Like.belongsTo(Post, { foreignKey: "postId" });
Like.belongsTo(Stories, { foreignKey: "storiesId" });
Like.belongsTo(Comment, { foreignKey: "commentId" });
Like.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Like, {foreignKey: 'postId', as: "postLike"}); 
Comment.hasMany(Like, {foreignKey: 'commentId', as: "commentLike"}); 
Stories.hasMany(Like, {foreignKey: 'storiesId', as: "storiesLike"}); 


module.exports = Like;