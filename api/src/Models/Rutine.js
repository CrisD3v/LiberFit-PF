const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Rutines', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, 
      // type: DataTypes.INTEGER,
      // allowNull: false,
      // primaryKey: true,
      // autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)};
