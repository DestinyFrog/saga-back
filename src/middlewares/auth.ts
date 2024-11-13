import jwt from 'jsonwebtoken'
import Usuarios from '../models/usuario.js'
import { Request, Response, NextFunction } from 'express'

export function processJWT(req:Request, res:Response, next:NextFunction) {
	const token = req.body?.jwt
	if (!token) {
		res.status(400)
			.json({"mensagem": "erro ao encontrar JWT"})
		return
	}

	var decoded = jwt.verify(token, process.env["SECRET"] as string)
	req["jwt"] = decoded["jwt"]
	next()
}

export function checkAuthentication(req:Request, res:Response, next:NextFunction) {
	const token = req["jwt"]
	if (!token) {
		res.status(400)
			.json({"mensagem": "erro ao encontrar JWT"})
		return
	}

	Usuarios.findOne( { where: { pid: token } } )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"mensagem": "usuário não encontrado no banco de dados"})
		}
		else {
			req["data"] = data
			next()
		}
	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({d: err,"mensagem": "erro na procura de usuarios no banco de dados"})
	})
}

export function checkAdmin(req:Request, res:Response, next:NextFunction) {
	const data = req["data"]

	if (!data) {
		res
			.status(400)
			.json({"mensagem": "erro ao encontrar dados do usuário"})
		return
	}

	if (data.acesso != "admin") {
		res
			.status(403)
			.json({"mensagem": "usuário não é administrador"})
		return
	}
	
	next()
}

export function checkTecnico(req:Request, res:Response, next:NextFunction) {
	const data = req["data"]

	if (!data) {
		res
			.status(400)
			.json({"mensagem": "erro ao encontrar dados do usuário"})
		return
	}

	if (data.acesso != "tecnico") {
		res
			.status(403)
			.json({"mensagem": "usuário não é técnico"})
		return
	}
	
	next()
}

export function checkPeao(req:Request, res:Response, next:NextFunction) {
	const data = req["data"]

	if (!data) {
		res
			.status(400)
			.json({"mensagem": "erro ao encontrar dados do usuário"})
		return
	}

	if (data.acesso != "peao") {
		res
			.status(403)
			.json({"mensagem": "usuário não é peão"})
		return
	}
	
	next()
}