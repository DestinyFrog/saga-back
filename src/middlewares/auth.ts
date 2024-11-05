import jwt from 'jsonwebtoken'
import Usuarios from '../models/usuario'

export function processJWT(req, res, next) {
	try {
		const token = req.cookies?.jwt
		if (!token)
			throw new Error("JWT não encontrado")

		var decoded = jwt.verify(token, process.env["SECRET"] as string)
		req.jwt = decoded["jwt"]
	} catch(err) {
		res.status(400)
			.json({"mensagem": "erro ao ler JWT"})
	}
	finally {
		next()
	}
}

export function checkAuthentication(req:any, res:any, next:any) {
	const token = req?.jwt
	if (!token)
		throw new Error("Not Logged")

	Usuarios.findOne( { where: { pid: token } } )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"erro": "usuário não encontrado no banco de dados"})
		}
		else {
			req.data = data
			next()
		}
	})
	.catch(err => {
		console.error(err)
		res.status(500)
			.json({"erro": "erro na procura de usuarios no banco de dados"})
	})
}

export function checkAdmin(req:any, res:any, next:any) {
	console.log(req.data)
	next()
}