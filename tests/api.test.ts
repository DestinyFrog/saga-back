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

