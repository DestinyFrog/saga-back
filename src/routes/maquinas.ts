import { Router } from "express"
import Maquinas from "../models/maquina.js"

const router = Router()

router.get("/", (req, res) => {
	Maquinas.findAll()
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
		codigo,
		nome,
		descricao,
		id_responsavel
	} = req.body

	Maquinas.create({
		codigo,
		nome,
		descricao,
		id_responsavel
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

router.delete("/:id", (req, res) => {
	const id = parseInt(req.params.id)

	Maquinas.destroy({
		where: {
			id
		}
	})
	.then(_ => {
		res.status(200)
			.json({mensagem: "máquina deletada com sucesso"})
	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({erro: "erro desconhecido no banco de dados"})
	})
})

export default router