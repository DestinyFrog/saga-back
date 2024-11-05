import { Router } from "express";
import Tarefas from "../models/tarefa.js";

const router = Router()

router.get("/", (req, res) => {
	Tarefas.findAll()
	.then(data => {
		res.status(200)
			.json(data)
	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({erro: "erro desconhecido no banco de dados"})
	})
})

router.post("/", (req, res) => {
	const {
		descricao,
		id_maquina,
		id_equipe,
	} = req.body

	const id_criador = req.cookies["id"]

	Tarefas.create({
		descricao,
		id_maquina,
		id_equipe,
		id_criador
	})
	.then(data => {
		res.status(200)
			.json(data)
	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({erro: "erro desconhecido no banco de dados"})
	})
})

router.delete("/:pid", (req, res) => {
	const pid = parseInt(req.params.pid)

	Tarefas.destroy({
		where: {
			pid
		}
	})
	.then(_ => {
		res.status(200)
			.json({mensagem: "tarefa deletado com sucesso"})
	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({erro: "erro desconhecido no banco de dados"})
	})
})

export default router