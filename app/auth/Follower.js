const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db"); // importing settings for connection to db

const Follower = sequelize.define(
  "Follower",
  {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

module.exports = Follower;