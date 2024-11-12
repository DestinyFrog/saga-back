import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js"
import Usuarios from "./usuario.js"

const Equipes = sequelize.define(
	'equipe',
	{
		nome: {
			type: DataTypes.STRING,
			allowNull: true,
    		unique: true
		}
	}
)

Equipes.belongsToMany(Usuarios, {through: 'equipes-usuarios'})
Usuarios.belongsToMany(Equipes, {through: 'equipes-usuarios'})

export default Equipes
