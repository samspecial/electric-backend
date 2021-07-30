"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        vaidate: {
          len: [3, 25],
          notEmpty: false
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        vaidate: {
          len: [3, 25],
          notEmpty: false
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      isAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        vaidate: {
          min: 10
        }
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }
};
