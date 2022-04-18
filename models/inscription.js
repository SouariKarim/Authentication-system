'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inscription.init(
    {
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      validated: DataTypes.BOOLEAN,
      bearer_token: DataTypes.STRING,
      validation_date: DataTypes.DATE,
    },
    {
      timestamps: false,
      sequelize,
      tableName: 'inscription',
      modelName: 'Inscription',
    }
  );
  return Inscription;
};
