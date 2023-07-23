const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db"); // importing settings for connection to db
const User = require("../auth/User");

const Stories = sequelize.define("Post", {
    content_stories: {
      type: DataTypes.TEXT,
      allowNull: true,
    }  
  }
);

Stories.belongsTo(User, { foreignKey: "userId" });


module.exports = Stories;