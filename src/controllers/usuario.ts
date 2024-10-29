
import { Router } from 'express'
import Usuario from '../models/usuario.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.use( (req, res, next) => {
	try {
		console.log("TOKEN:", req.cookies?.jwt || "")

		const token = req.cookies?.jwt
		if (!token)
			throw new Error("Not Logged")

		console.log("TOKEN:", token)

		var decoded = jwt.verify(token, process.env["SECRET"] as string)
		req.cookies.pid = decoded
		console.log("DECODED TOKEN:", decoded)
	} catch(err) {
		throw err
	}

	next()
} )

router.get("/info", (req, res) => {
	const pid = req.cookies["pid"]

	if (typeof pid !== "string") {
		res.status(400)
			.json({"mensagem": "usuário não logado"})
		return
	}

	Usuario.findOne( { where: { pid } } )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"erro": "usuário não encontrado no banco de dados"})
		}
		else {
			res.status(200)
				.json(data)
		}
	})
	.catch(_ => {
		res.status(500)
			.json({"erro": "erro na procura de usuarios no banco de dados"})
	})
})

router.delete("/:id", (req, res) => {
	
})

export default router