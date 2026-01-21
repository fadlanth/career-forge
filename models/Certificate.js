const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Certificate = sequelize.define(
  "Certificate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    issuer: {
      type: DataTypes.STRING(100),
    },
    issueDate: {
      type: DataTypes.DATEONLY,
    },
    credentialUrl: {
      type: DataTypes.STRING(255),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "certificates",
    timestamps: true,
  },
);

module.exports = Certificate;
