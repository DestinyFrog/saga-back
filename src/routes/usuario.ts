import { Router } from 'express'
import { checkAuthentication, processJWT } from '../middlewares/auth.js'
import client from '../db/conn.js'

const router = Router()

router.get("/",
	processJWT,
	checkAuthentication,
	(req, res) => {
		const id = req["data"].id

		client.usuario.findFirst({
			where : {
				id
			},
			include: {
				Equipes: true,
				MaquinasCriadas: true,
				SubTarefa: true,
				TarefasCriadas: true
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
	}
)

router.get("/tarefas",
	processJWT,
	checkAuthentication,
	(req, res) => {
		const id = req["data"].id

		client.tarefa.findMany({
			include: {
				Equipe: {
					include: {
						usuarios: true	
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
	}
)

export default router