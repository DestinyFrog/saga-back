import {describe, expect, test} from '@jest/globals'
import axios from 'axios'

const LINK = "http://localhost:3000"

describe("check API", () => {
	test('[GET] ping', async () => {
		const response = await axios.get(`${LINK}/`)
		expect(response.status).toBe(200)
		expect(response.data).toBe("Hello, World!!")
	})
})

describe("Autenticação", () => {
	const data = {
		pid: 'f3da7ccb-8f74-4b54-a3d7-a92e9a177798',
		nome: 'teste',
		senha: 'teste',
		email: 'teste@email.com',
		telefone: '11011223344',
		cpf: '01001001011',
		admin: false
	}

	let token = null

	test('[POST] /auth/cadastrar', async () => {
		const response = await axios.post(`${LINK}/auth/cadastrar`, data)
		expect(response.status).toBe(200)
	})

	test('[POST] /auth/login', async () => {
		let response = await axios.post(`${LINK}/auth/login`, { nome: data.nome, senha: data.senha }, { withCredentials: true })
		expect(response.status).toBe(200)
	})
})