import Express from 'express'
import dotenv from 'dotenv'
import sequelize from './db/conn.js'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.js'
import UsuarioRouter from './routes/usuario.js'
import MaquinaRouter from './routes/maquinas.js'
import EquipeRouter from './routes/equipe.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = Express()

app.use( cookieParser() )
app.use( Express.json() )

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-credentials", 'true');
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
	next();
})

app.use( "/app", Express.static(__dirname + "/public") )

// Controllers
app.use("/auth", AuthRouter)
app.use("/usuario", UsuarioRouter)
app.use("/maquina", MaquinaRouter)
app.use("/equipe", EquipeRouter)

app.get("/", async (_, res) => {
	res.end("Hello, World!!")
})

const PORT = process.env["PORT"]

sequelize.sync()
.then(() => {
	app.listen(PORT, () =>
		console.log(`API Server listening at :${PORT}`) )
})
