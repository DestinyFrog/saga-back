import { Router } from 'express'
import Usuario from '../models/usuario.js'
import jwt from 'jsonwebtoken'
import { checkAuthentication, processJWT } from '../middlewares/auth.js'

const router = Router()

router.post("/login", (req, res) => {
	const body = req.body

	if (typeof body.login !== "string") {
		res.status(400)
			.json({"erro": "coluna 'login' indefinida"})
		return
	}

	if (typeof body.senha !== "string") {
		res.status(400)
			.json({"erro": "coluna 'senha' indefinida"})
		return
	}

	Usuario.findOne( {where: 
		{ login: body.login }
	} )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"erro": "usuário não encontrado no banco de dados"})
		}
		else {
			if ( body.senha === data.get("senha") ) {
				const token = jwt.sign( { jwt: data.get("pid") }, process.env["SECRET"] as string )

				res.status(200)
					.cookie("jwt", token)
					.json({"mensagem": "usuário logado"})
			}
			else {
				res.status(403)
					.json({"erro": "senha incorreta"})
			}
		}

	})
	.catch(_ => {
		res.status(500)
			.json({"erro": "erro na procura de usuarios no banco de dados"})
	})
})

router.get("/check",
	processJWT,
	checkAuthentication,
	(req, res) => {
		res.status(200)
			.json({"mensagem":"usuário logado"})
	}
)

router.post("/sair",
	processJWT,
	(req, res) => {
	res
		.clearCookie("jwt")
		.json({"mensagem": "saiu com sucesso"})
})

export default router
