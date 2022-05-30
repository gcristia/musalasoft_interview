import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
})

const NODE_ENV = process.env.NODE_ENV || 'development'
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000
const MONGO_DB = process.env.MONGO_DB || '3000'

export { NODE_ENV, HOST, PORT, MONGO_DB }
