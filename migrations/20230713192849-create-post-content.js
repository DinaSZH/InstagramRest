"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PostContents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PostContents");
  },
};
