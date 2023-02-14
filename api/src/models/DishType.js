const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dishType",
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

/*
// Ver como implementar la api de cloudinary y un input tipo file para subir imagen
*/