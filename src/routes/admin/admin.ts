import { Router } from "express"
import { checkAdmin, checkAuthentication, processJWT } from "../../middlewares/auth"
import usuarioAdminRouter from './usuario'
import client from "../../db/conn"
import jwt from 'jsonwebtoken'

const router = Router()

router.use(processJWT)
router.use(checkAuthentication)
router.use(checkAdmin)

router.use("/usuario", usuarioAdminRouter)

router.post("/login", ({body}, res) => {
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

				if (data.acesso as string !== "ADMIN") {
					res.status(403)
						.json({"mensagem": "usuário não é administrador"})
				} else {
					res.status(200)
						.json({"jwt": token})
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

export default router