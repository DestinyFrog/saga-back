import {describe, expect, test} from '@jest/globals'
import axios from 'axios'

const LINK = "http://localhost:3000"

describe("Testar Maquinas", () => {

	const nova_maquina = {
		codigo: "0010",
		nome: "torno mecânico de teste",
		descricao: "objeto de teste apenas",
		id_responsavel: 1
	}

	let id_maquina:number|null = null

	test('[POST] Criar uma maquina', async () => {
		const response = await axios.post(`${LINK}/maquina`, nova_maquina)
		expect(response.status).toBe(200)
		expect((<any> response.data).codigo).toBe(nova_maquina.codigo)
		id_maquina = (<any> response.data).id
	})

	test('[GET] Pegar dados de todos', async () => {
		const response = await axios.get(`${LINK}/maquina`)
		expect(response.status).toBe(200)
		expect( (<any[]> response.data).length ).toBeGreaterThan(0)
	})


	test('[DELETE] Deletar uma maquina', async () => {
		expect(id_maquina).toBeGreaterThan(0)
		const response = await axios.delete(`${LINK}/maquina/${id_maquina}`)
		expect(response.status).toBe(200)
	})

})
