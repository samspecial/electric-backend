"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      subscription.belongsTo(models.user, {
        foreignKey: "userId",
        as: "users"
      });

      subscription.belongsTo(models.plan, {
        foreignKey: "planId",
        as: "plans"
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  subscription.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false
      },

      expired_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "subscription"
    }
  );
  return subscription;
};
