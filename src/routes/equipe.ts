import { Router } from 'express'
import { checkAdmin, checkAuthentication, processJWT } from '../middlewares/auth.js'
import Equipes from '../models/equipe.js'
import Tarefas from '../models/tarefa.js'
import Usuarios from '../models/usuario.js'

const router = Router()

router.get("/all",
	processJWT,
	checkAuthentication,
	(req, res) => {
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
	}
)

router.get("/",
	processJWT,
	checkAuthentication,
	(req, res) => {
		const id = req["data"].id
		console.log("ID", id)
		
		Equipes.findAll({
			include: [
				{
					model: Usuarios
				}
			]
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
	}
)

export default router