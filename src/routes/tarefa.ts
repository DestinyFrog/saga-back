import { Router } from "express"
import { processJWT, checkAuthentication, checkTecnico } from "../middlewares/auth.js"
import client from "../db/conn.js"

const router = Router()

router.get("/",
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
				},
				maquina: true,
				criador: true
			}
		})
		.then(data => {
			const d = data.filter(e => {
				let yes = false
				e.Equipe.usuarios.forEach(f => {
					if (f.id == id)
						yes = true
				})
				return yes
			})

			res.status(200)
				.json(d)
		})
		.catch(err => {
			console.error(err)
			res.status(500)
				.json({erro: "erro desconhecido no banco de dados"})
		})
	}
)

router.post("/",
	processJWT,
	checkAuthentication,
	checkTecnico,
	(req, res) => {
		const id = req["data"].id
	
		const body = req.body
		client.tarefa.create({
			data: {
				criadorId: id,
				titulo: body.titulo,
				descricao: body.descricao,
				criticidade: parseInt(body.criticidade),
				tipo: body.tipo,
				estado: body.processo,
				equipeId: parseInt(body.id_equipe),
				maquinaId: parseInt(body.id_maquina)
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