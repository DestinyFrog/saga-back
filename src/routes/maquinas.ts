import { Router } from "express"
import { processJWT, checkAuthentication, checkTecnico } from "../middlewares/auth.js"
import client from "../db/conn.js"

const router = Router()

router.get("/",
	processJWT,
	checkAuthentication,
	checkTecnico,
	(req, res) => {
	client.maquina.findMany({
		include: {
			responsavel: true,
			Submaquinas: {
				include: {
					SubTarefa: true
				}
			},
			Tarefa: {
				orderBy: {
					createdAt: "asc"
				}
			}
		}
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

router.post("/",
	processJWT,
	checkAuthentication,
	checkTecnico,
	(req, res) => {
	const id_responsavel = req["data"].id as number

	client.maquina.create({
		data: {
			codigo: req.body["codigo"] as string,
			descricao: req.body["descricao"] as string,
			nome: req.body["nome"] as string,
			responsavelId: id_responsavel
		}
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

router.put("/:pid",
	processJWT,
	checkAuthentication,
	checkTecnico,
	(req, res) => {
	const pid = req.params.pid

	client.maquina.update({
		data: {
			codigo: req.body["codigo"] as string,
			descricao: req.body["descricao"] as string,
			nome: req.body["nome"] as string
		},
		where: {
			pid
		}
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

router.delete("/:pid",
	processJWT,
	checkAuthentication,
	checkTecnico,
	(req, res) => {
	const pid = req.params.pid

	client.maquina.delete({
		where: {
			pid
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