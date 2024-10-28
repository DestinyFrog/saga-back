import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js"

const Usuario = sequelize.define(
	'usuario',
	{
		pid: {
			type: DataTypes.UUID
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
		},
		cpf: {
			type: DataTypes.STRING(20)
		},
		admin: {
			type: DataTypes.BOOLEAN
		},
		foto: {
			type: DataTypes.BLOB
		}
	}
)

export default Usuario
