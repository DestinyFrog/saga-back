import { DataTypes, UUIDV4 } from "sequelize"
import sequelize from "../db/conn.js"

const Usuarios = sequelize.define(
	'usuario',
	{
		pid: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4
		},
		login: {
			type: DataTypes.STRING(10)
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
    		unique: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
    		unique: true
		},
		telefone: {
			type: DataTypes.STRING(16),
			allowNull: false,
    		unique: true
		},
		senha: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		cpf: {
			type: DataTypes.STRING(20),
			allowNull: false,
    		unique: true
		},
		acesso: {
			type: DataTypes.STRING(25),
			allowNull: false,
			defaultValue: "peao"
		},
		foto: {
			type: DataTypes.BLOB
		}
	}
)

export default Usuarios
