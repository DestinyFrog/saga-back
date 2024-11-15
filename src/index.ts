import Express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.js'
import UsuarioRouter from './routes/usuario.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = Express()

app.use( cookieParser() )
app.use( Express.json() )
app.use( cors() )

app.use("/", Express.static(__dirname+"/public"))

// Controllers
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/usuario", UsuarioRouter)

app.get("/api/v1", (_, res) => {
	res.end("Hello, World!!")
})

const PORT = process.env["PORT"]

app.listen(PORT, () =>
	console.log(`API Server listening at :${PORT}`) )
