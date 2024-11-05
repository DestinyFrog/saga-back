
import { Router } from 'express'
import { checkAdmin, checkAuthentication, processJWT } from '../middlewares/auth.js'
import Usuarios from '../models/usuario.js'

const router = Router()

router.get("/info",
	processJWT,
	checkAuthentication,
	(req, res) => {
		res.status(200)
			.json( req["data"] )
	}
)

router.post("/",
	processJWT,
	checkAuthentication,
	checkAdmin,
	(req, res) => {
		
	}
)

router.delete("/:pid",
	processJWT,
	checkAuthentication,
	checkAdmin,
	(req, res) => {
		const pid = req.params.pid

		if (!pid) {
			res.status(400)
				.json({"mensagem": "id público inválido"})
		}

		Usuarios.destroy({
			where: {
				pid
			}
		})
		.then(_ => {
			res.status(200)
				.json({mensagem: "usuário deletado com sucesso"})
		})
		.catch(err => {
			console.error(err)
			res.status(500)
				.json({erro: "erro desconhecido no banco de dados"})
		})
	}
)

export default router