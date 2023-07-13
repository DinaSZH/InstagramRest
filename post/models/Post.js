const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db"); // importing settings for connection to db
const User = require("../../app/auth/User");

const Post = sequelize.define("Post", {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publish_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },   
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

Post.belongsTo(User, { foreignKey: "userId" });


module.exports = Post;
