const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db"); // importing settings for connection to db
const User = require("../../auth/User");

const Post = sequelize.define("Post", {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }
);

Post.belongsTo(User, { foreignKey: "userId" });


module.exports = Post;
