import Express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sequelize from './db/conn.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.js'
import UsuarioRouter from './routes/usuario.js'
import MaquinaRouter from './routes/maquinas.js'
import EquipeRouter from './routes/equipe.js'
import TarefaRouter from './routes/tarefa.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = Express()

app.use( cookieParser() )
app.use( Express.json() )
app.use( cors() )

// Controllers
app.use("/auth", AuthRouter)
app.use("/usuario", UsuarioRouter)
app.use("/maquina", MaquinaRouter)
app.use("/equipe", EquipeRouter)
app.use("/tarefa", TarefaRouter)

app.get("/", async (_, res) => {
	res.end("Hello, World!!")
})

const PORT = process.env["PORT"]

sequelize.sync()
.then(() => {
	app.listen(PORT, () =>
		console.log(`API Server listening at :${PORT}`) )
})
