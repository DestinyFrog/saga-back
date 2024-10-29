import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js"

const Equipes = sequelize.define(
	'equipe',
	{
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
    		unique: true
		}
	}
)

export default Equipes
