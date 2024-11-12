import { Router } from "express";
import Tarefas from "../models/tarefa.js";
import { checkAuthentication, processJWT } from "../middlewares/auth.js";
import Equipes from "../models/equipe.js";
import Usuarios from "../models/usuario.js";

const router = Router()

router.get("/",
	processJWT,
	checkAuthentication,
	(req, res) => {
		const id = req["data"].id
		
		Tarefas.findAll({
			include: [
				{
					model: Equipes,
					include: [
						{
							model: Usuarios
						}
					]
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