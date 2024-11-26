import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

config()

const client = new PrismaClient()
export default client