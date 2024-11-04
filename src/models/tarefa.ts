import { DataTypes, UUIDV4 } from "sequelize"
import sequelize from "../db/conn.js"

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
		},
		id_criador: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_equipe: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_maquina: {
			type: DataTypes.INTEGER
		}
	}
)

export default Tarefas