import {describe, expect, test} from '@jest/globals'
import axios from 'axios'

const LINK = "http://localhost:3000"

describe("Testar Maquinas", () => {

	const admin = {
		codigo: "12345",
		senha: "pascal"
	}

	test("TESTE 1", async () => {
		const p = new Promise( () => {
			return "TESTE 1"
		} )

		await p.
		console.log("TESTE 1")
	})

	test("TESTE 2", async () => {
		console.log("TESTE 2")
	})

})
