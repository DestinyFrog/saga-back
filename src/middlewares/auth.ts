import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import client from '../db/conn.js'
import { Acesso } from "../types.d.js"

export function processJWT(req:Request, res:Response, next:NextFunction) {
	const token = req.cookies?.jwt
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
	const pid = req["jwt"]
	if (!pid) {
		res.status(400)
			.json({"mensagem": "erro ao encontrar JWT"})
		return
	}

	client.usuario.findFirst( {
		where: { pid }
	} )
	.then(data => {
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
			.json({"mensagem": "erro na procura de usuarios no banco de dados"})
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

	if (data.acesso != Acesso.ADMIN) {
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

	if (data.acesso != Acesso.TECNICO) {
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

	if (data.acesso != Acesso.PEAO) {
		res
			.status(403)
			.json({"mensagem": "usuário não é peão"})
		return
	}
	
	next()
}