"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class secret extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      secret.belongsTo(models.user, {
        foreignKey: "userId",
        as: "users"
      });
    }
  }
  secret.init(
    {
      token: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "secret"
    }
  );
  return secret;
};
