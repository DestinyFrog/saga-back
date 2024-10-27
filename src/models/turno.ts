
import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js"

const Turno = sequelize.define(
	'turno',
	{
		nome: {
			type: DataTypes.STRING
		},
		inicio: {
			type: DataTypes.TIME
		},
		fim: {
			type: DataTypes.TIME
		}
	}
)

export default Turno