import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import dotenv from 'dotenv'

// env setup
dotenv.config()


const url = process.env.MONGO_URI
const client = new MongoClient(url)
const dbName = 'passop'


const app = express()
const port = 3000


app.use(express.json())
app.use(cors({ origin: "https://vaultlocker.vercel.app"}))


// connection with client 
client.connect()

// get route for gettin passwords
app.get('/', async (req, res) => { 

    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray()
    res.json(findResault)
})

// savin password
app.post ('/', async (req, res) => { 

    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password)
    res.send({ success: true, result: findResult })

})


// passwd delete using uuid 
app.delete ('/', async (req, res) => { 

    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password)
    res.send({ success: true, result: findResult })

})


if (process.env.NOTE_ENV !== 'production') {

    app.listen(port, () => { 

        console.log(`Listening on ${port}`)
    })
}

export default app