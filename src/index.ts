import Express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sequelize from './db/conn.js'
import AuthRouter from './controllers/auth.js'

dotenv.config()

const app = Express()

app.use( Express.json() )
app.use( cors() )

// Controllers
app.use("/auth", AuthRouter)

app.get("/", async (_, res) => {
	res.end("Hello, World!!")
})

const PORT = process.env["PORT"]


sequelize.sync()
.then(() => {
	app.listen(PORT, () =>
		console.log(`API Server listening at :${PORT}`) )
})
