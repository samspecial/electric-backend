"use strict";
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
      }
    },
    {
      sequelize,
      modelName: "user"
    }
  );
  return user;
};
