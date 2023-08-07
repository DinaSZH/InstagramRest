// models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db"); // importing settings for connection to db

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);


User.belongsToMany(User, { as: "followers", through: "Follower", foreignKey: "userId", otherKey: "followerId" });
User.belongsToMany(User, { as: "followings", through: "Follower", foreignKey: "followerId", otherKey: "userId" });


module.exports = User;
