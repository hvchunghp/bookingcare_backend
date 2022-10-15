"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor_info.belongsTo(models.User, { foreignKey: "doctorId" });
      Doctor_info.belongsTo(models.Allcode, {
        foreignKey: "provinces",
        targetKey: "keyMap",
        as: "provincesTypeData",
      });
    }
  }
  Doctor_info.init(
    {
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      price: DataTypes.STRING,
      provinces: DataTypes.STRING,
      clinicId: DataTypes.INTEGER,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_info",
      freezeTableName: true,
    }
  );
  return Doctor_info;
};
