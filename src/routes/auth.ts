import { Router } from 'express'
import Usuario from '../models/usuario.js'
import jwt from 'jsonwebtoken'
import { checkAuthentication, processJWT } from '../middlewares/auth.js'

const router = Router()

router.post("/login", (req, res) => {
	const body = req.body

	if (typeof body.login !== "string") {
		res.status(400)
			.json({"mensagem": "coluna 'login' indefinida"})
		return
	}

	if (typeof body.senha !== "string") {
		res.status(400)
			.json({"mensagem": "coluna 'senha' indefinida"})
		return
	}

	Usuario.findOne( {where: 
		{ login: body.login }
	} )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"mensagem": "usuário não encontrado no banco de dados"})
		}
		else {
			if ( body.senha === data.get("senha") ) {
				const token = jwt.sign( { jwt: data.get("pid") }, process.env["SECRET"] as string )
				console.log("TOKEN",token)

				if (data["acesso"] == "admin") {
					res.status(403)
						.json({"mensagem": "usuário não é um funcionário ou técnico"})
				} else {
					res.status(200)
						.cookie("jwt", token)
						.json({"mensagem": "usuário logado"})
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

	if (typeof body.senha !== "string") {
		res.status(400)
			.json({"mensagem": "coluna 'senha' indefinida"})
		return
	}

	Usuario.findOne( {where: 
		{ login: body.login }
	} )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"mensagem": "usuário não encontrado no banco de dados"})
		}
		else {
			if ( body.senha === data.get("senha") ) {
				const token = jwt.sign( { jwt: data.get("pid") }, process.env["SECRET"] as string )

				if (data["acesso"]  == "admin")
					res.status(200)
						.cookie("jwt", token)
						.json({"mensagem": "usuário logado"})
				else
					res.status(403)
						.json({"mensagem": "usuário não tem permissão de adminsitrador"})
			}
			else {
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