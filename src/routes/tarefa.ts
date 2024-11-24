import { Router } from "express"
import { processJWT, checkAuthentication, checkTecnico, checkPeao } from "../middlewares/auth.js"
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
				criador: true,
				SubTarefa: {
					include: {
						respostas: true
					}
				}
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

router.get("/criadas",
	processJWT,
	checkAuthentication,
	checkTecnico,
	(req, res) => {
		const id = req["data"].id

		client.tarefa.findMany({
			where: {
				criadorId: id
			},
			include: {
				maquina: true,
				SubTarefa: {
					include: {
						respostas: true
					}
				},
				criador: true
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

router.post("/resposta/:sub_tarefa_id",
	processJWT,
	checkAuthentication,
	checkPeao,
	(req, res) => {
		const id = req["data"].id
		const id_subtarefa = parseInt(req.params.sub_tarefa_id)

		const body = req.body

		if (!body.alerta) {
			client.subTarefa.update({
				where: {
					id: id_subtarefa
				},
				data: {
					concluido: true,
					updatedAt: ( new Date() )
				}
			})
			.then(data => {
				updateTarefa(data.tarefaId)
			})
			.catch(err => {
				console.error(err)
				res.status(500)
					.json({erro: "erro desconhecido no banco de dados"})
			})
		}

		client.respostaSubTarefa.create({
			data: {
				titulo: body.titulo,
				descricao: body.descricao,
				subTarefaId: id_subtarefa,
				alerta: body.alerta,
				usuarioId: id
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

async function updateTarefa(idTarefa) {
	const tarefas = await client.tarefa.findFirst({
		where: {
			id: idTarefa
		},
		include: {
			SubTarefa: true
		}
	})

	let allConcluded = true
	tarefas.SubTarefa.forEach(data => {
		if (data.concluido == false) {
			allConcluded = false
		}
	})

	if (allConcluded) {
		await client.tarefa.update({
			where: {
				id: idTarefa
			},
			data: {
				finalizadoEm: (new Date()),
				estado: "CONCLUÍDO"
			}
		})
	} else {
		await client.tarefa.update({
			where: {
				id: idTarefa
			},
			data: {
				estado: "EM ANDAMENTO"
			}
		})
	}
}

export default router