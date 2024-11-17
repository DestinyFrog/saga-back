import { Router } from 'express'
import client from '../../db/conn.js'
import { Acesso } from '../../types.js'

const router = Router()

router.get("/", (_, res) => {
	client.usuario.findMany()
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
	client.usuario.create({
		data: {
			cpf: req.body["cpf"] as string,
			telefone: req.body["telefone"] as string,
			login: req.body["login"] as string,
			senha: req.body["senha"] as string,
			nome: req.body["nome"],
			email: req.body["email"] as string,
			acesso: req.body["acesso"] as Acesso
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

router.put("/:pid", (req, res) => {
	const pid = req.params.pid as string

	client.usuario.update({
		data: {
			cpf: req.body["cpf"] as string,
			telefone: req.body["telefone"] as string,
			login: req.body["login"] as string,
			senha: req.body["senha"] as string,
			nome: req.body["nome"],
			email: req.body["email"] as string,
			acesso: req.body["acesso"] as Acesso
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

router.delete("/:pid", (req, res) => {
	const pid = req.params.pid as string

	client.usuario.delete({
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

export default router