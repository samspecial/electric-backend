"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("users", {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 25],
          notEmpty: true
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 25],
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      role: {
        type: DataTypes.ENUM("customer", "admin", "field_agent"),
        defaultValue: "customer"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [16, 100],
          notEmpty: true
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
