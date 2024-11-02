import Express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sequelize from './db/conn.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './controllers/auth.js'
import UsuarioRouter from './controllers/usuario.js'
import MaquinaRouter from './controllers/maquinas.js'
import { populate } from './db/seed.js'

dotenv.config()

const app = Express()

app.use( cookieParser() )
app.use( Express.json() )
app.use( cors() )

// Controllers
app.use("/auth", AuthRouter)
app.use("/usuario", UsuarioRouter)
app.use("/maquina", MaquinaRouter)

app.get("/", async (_, res) => {
	res.end("Hello, World!!")
})

const PORT = process.env["PORT"]

sequelize.sync()
.then(() => {
	// populate()

	app.listen(PORT, () =>
		console.log(`API Server listening at :${PORT}`) )
})
