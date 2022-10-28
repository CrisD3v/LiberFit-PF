import { Model, DataTypes } from 'sequelize'
// import { Sequelize, Model, DataTypes } from 'sequelize-typescritp'
import db from '../db'

interface MachineAttributes {
  id: any
  name: string
  image: string
  muscle:string
}
class MachineInstance extends Model<MachineAttributes> {}

MachineInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    muscle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'machine',
    freezeTableName:true
  }
)

export default MachineInstance