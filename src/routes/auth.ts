import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { checkAuthentication, processJWT } from '../middlewares/auth.js'
import client from '../db/conn.js'

const router = Router()

router.post("/login", (req, res) => {
	const body = req.body

	if (typeof body.login !== "string") {
		res.status(400)
			.json({"mensagem": "coluna 'login' indefinida"})
		return
	}

	client.usuario.findFirst( {where: {
		login: body.login
	}} )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"mensagem": "usuário não encontrado no banco de dados"})
		}
		else {
			if ( body.senha as string === data.senha ) {
				const token = jwt.sign( { jwt: data.pid }, process.env["SECRET"] as string )

				if (data.acesso == "ADMIN") {
					res.status(403)
						.json({"mensagem": "usuário não é um funcionário ou técnico"})
				} else {
					res.status(200)
						.cookie("jwt", token)
						.json(data)
				}
			} else {
				res.status(403)
					.json({"mensagem": "senha incorreta"})
			}
		}

	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({"mensagem": "erro na procura de usuarios no banco de dados"})
	})
})

router.post("/login-admin", (req, res) => {
	const body = req.body

	if (typeof body.login !== "string") {
		res.status(400)
			.json({"mensagem": "coluna 'login' indefinida"})
		return
	}

	client.usuario.findFirst( {where: {
		login: body.login
	}} )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"mensagem": "usuário não encontrado no banco de dados"})
		}
		else {
			if ( body.senha as string === data.senha ) {
				const token = jwt.sign( { jwt: data.pid }, process.env["SECRET"] as string )

				if (data.acesso != "ADMIN") {
					res.status(403)
						.json({"mensagem": "usuário não é administrador"})
				} else {
					res.status(200)
						.cookie("jwt", token)
						.json(data)
				}
			} else {
				res.status(403)
					.json({"mensagem": "senha incorreta"})
			}
		}

	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({"mensagem": "erro na procura de usuarios no banco de dados"})
	})
})

router.get("/check",
	processJWT,
	checkAuthentication,
	(_, res) => {
		res
			.status(200)
			.json({"mensagem":"usuário está logado"})
	}
)

router.post("/sair",
	processJWT,
	(_, res) => {
	res
		.status(200)
		.clearCookie("jwt")
		.json({"mensagem": "saiu com sucesso"})
})

export default router