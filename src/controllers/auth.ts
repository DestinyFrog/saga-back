import { Router } from 'express'
import Usuario from '../models/usuario.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.post("/cadastrar", (req, res) => {
	const body = req.body

	if (typeof body.nome !== "string") {
		res.status(400)
			.json({"erro": "coluna 'nome' indefinida"})
		return
	}

	Usuario.create(body)
	.then(() => {
		res.status(200)
			.json({"mensagem": "usuario inserido com sucesso"})
	})
	.catch(_ => {
		res.status(500)
			.json({"erro": "erro na inserção de usuarios no banco de dados"})
	})
})

router.post("/login", (req, res) => {
	const body = req.body

	if (typeof body.nome !== "string") {
		res.status(400)
			.json({"erro": "coluna 'nome' indefinida"})
		return
	}

	if (typeof body.senha !== "string") {
		res.status(400)
			.json({"erro": "coluna 'senha' indefinida"})
		return
	}

	Usuario.findOne( {where: 
		{ nome: body.nome }
	} )
	.then( (data) => {
		if (data == null) {
			res.status(404)
				.json({"erro": "usuário não encontrado no banco de dados"})
		}
		else {
			if ( body.senha === data.get("senha") ) {
				const token = jwt.sign( { jwt: data.get("pid") }, process.env["SECRET"] as string )

				res.status(200)
					.cookie("jwt", token)
					.json({"mensagem": "usuário logado"})
			}
			else {
				res.status(403)
					.json({"erro": "senha incorreta"})
			}
		}

	})
	.catch(_ => {
		res.status(500)
			.json({"erro": "erro na procura de usuarios no banco de dados"})
	})
})

router.post("/check", (req, res) => {
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
				.json({"mensagem": "usuário logado"})
		}
	})
	.catch(_ => {
		res.status(500)
			.json({"erro": "erro na procura de usuarios no banco de dados"})
	})
})

router.post("/sair", (req, res) => {
	res
		.clearCookie("jwt")
		.json({"mensagem": "saiu com sucesso"})
})

router.get("/login-get/:pid", (req, res) => {
	const pid = req.params["pid"]

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
			const token = jwt.sign( { pid }, process.env["SECRET"] as string )

			res.status(200)
				.cookie("jwt", token)
				.json( {"mensagem": "logado com sucesso"} )
		}
	})
	.catch(_ => {
		res.status(500)
			.json({"erro": "erro na procura de usuarios no banco de dados"})
	})
})

export default router
