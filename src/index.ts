import Express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import AuthRouter from './routes/auth.js'
import UsuarioRouter from './routes/usuario.js'
import MaquinaRouter from './routes/maquinas.js'
import TarefaRouter from './routes/tarefa.js'
import EquipeRouter from './routes/equipe.js'
import AdminRouter from './routes/admin/admin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = Express()

app.use( cookieParser() )
app.use( Express.json() )
app.use( cors() )

app.use("/", Express.static(__dirname+"/../public"))

// Controllers
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/usuario", UsuarioRouter)
app.use("/api/v1/maquina", MaquinaRouter)
app.use("/api/v1/tarefa", TarefaRouter)
app.use("/api/v1/equipe", EquipeRouter)
app.use("/api/v1/admin", AdminRouter)

app.get("/api/v1", (_, res) => {
	res.end("Hello, World!!")
})

const PORT = process.env["PORT"] || 3000

app.listen(PORT, () =>
	console.log(`API Server listening at :${PORT}`) )
