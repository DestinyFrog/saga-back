import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js"

const Usuario = sequelize.define(
	'usuario',
	{
		pid: {
			type: DataTypes.UUIDV4
		},
		nome: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		telefone: {
			type: DataTypes.STRING(16)
		},
		senha: {
			type: DataTypes.STRING(32)
		}
	}
)

export default Usuario