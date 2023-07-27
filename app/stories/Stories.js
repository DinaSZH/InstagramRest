const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db"); // importing settings for connection to db
const User = require("../auth/User");

const Stories = sequelize.define("Stories", {
    content_stories: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false, // Отключение использования полей createdAt и updatedAt
  }
);

Stories.belongsTo(User, { foreignKey: "userId" });


module.exports = Stories;