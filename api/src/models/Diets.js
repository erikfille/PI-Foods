const { DataTypes } = require("sequelize");
// const { sequelize } = require("../db.js");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "diets",
    {
      id: {
        type: DataTypes.UUID, // Chequear las diferencias entre UUIDV1 y UUIDV4
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
