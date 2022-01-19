"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
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
  plan.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      package_benefit: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
    },
    {
      sequelize,
      modelName: "plan"
    }
  );
  return plan;
};
