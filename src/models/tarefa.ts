import { DataTypes, UUIDV4 } from "sequelize"
import sequelize from "../db/conn.js"
import Equipes from "./equipe.js"
import Usuarios from "./usuario.js"

const Tarefas = sequelize.define(
	'tarefa',
	{
		pid: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4
		},
		descricao: {
			type: DataTypes.TEXT,
			defaultValue: ""
		},
		estado: {
			type: DataTypes.ENUM('pendente','em andamento','concluído'),
			defaultValue: 'pendente'
		},
		finalizado_em: {
			type: DataTypes.DATE,
			defaultValue: null
		}
	}
)

Tarefas.belongsTo(Equipes)

Tarefas.hasOne(Usuarios, {foreignKey: "id_criador"})
Usuarios.hasMany(Tarefas)

export default Tarefas