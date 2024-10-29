import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js"
import Usuarios from "./usuario.js"

const Maquinas = sequelize.define(
	'maquina',
	{
		codigo: {
			type: DataTypes.STRING
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
    		unique: true
		},
		descricao: {
			type: DataTypes.TEXT
		},
		id_responsavel: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}
)

Maquinas.belongsTo(Usuarios, { foreignKey: 'id_responsavel' })

export default Maquinas