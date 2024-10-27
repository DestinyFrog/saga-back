import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js"

const Mensagem = sequelize.define(
	'mensagem',
	{
		titulo: {
			type: DataTypes.STRING
		},
		mensagem: {
			type: DataTypes.STRING
		},
	}
)

export default Mensagem