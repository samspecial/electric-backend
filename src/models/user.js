"use strict";
require("./pgEnum-fix");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.secret, {
        foreignKey: "userId",
        as: "secrets",
        onDelete: "CASCADE"
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  user.init(
    {
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
          notEmpty: true,
          notNull: true
        }
      }
    },
    {
      sequelize,
      modelName: "user"
    }
  );
  return user;
};
