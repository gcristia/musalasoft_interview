import mongoose from 'mongoose'
import { MONGO_DB } from './../config.js'

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_DB)
        console.log('MONGO-DB CONNECT')
    } catch (error) {
        console.log(error)
        throw new Error('Error connecting to the DB - Contact the Admin')
    }
}

export default dbConnection
