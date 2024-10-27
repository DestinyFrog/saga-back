import { Sequelize } from "sequelize"
import { config } from "dotenv"

config()

const db_url = process.env["DATABASE_URL"] 

if (db_url == undefined)
	throw new Error("Database URL not found in 'ENV'")

const sequelize = new Sequelize(db_url)
export default sequelize