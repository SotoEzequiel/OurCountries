const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
       
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    poblacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    car:{
      type: DataTypes.STRING,
      allowNull:true
    },
    timezone:{
      type:DataTypes.STRING,
      allowNull:true

    },
    maps:{
      type:DataTypes.STRING,
      allowNull:true
    },
  },{
    freezeTableName: true,
    timestamps:false
  });
};
