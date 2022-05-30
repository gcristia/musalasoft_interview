import express from 'express'
import http from 'http'
import cors from 'cors'

import dbConnection from './database/mongodb.config.js'
import { HOST, NODE_ENV, PORT } from './config.js'
import v1GatewaysRouter from './routes/v1/gateways.routes.js'
import v1DevicesRouter from './routes/v1/devices.routes.js'

//DB Config
await dbConnection()

//Init BACKEND
const app = express()

//Middleware
app.use(express.json())
app.use(cors())

// Node Server
const server = http.createServer(app)

//APIS
app.use('/api/v1/gateways', v1GatewaysRouter)
app.use('/api/v1/devices', v1DevicesRouter)

server.listen(PORT, HOST, (err) => {
    if (err) throw new Error(err)

    console.log(`ENVIRONMENT: ${NODE_ENV}`)
    console.log(`APP LISTENING ON https://${HOST}:${PORT}`)
})
