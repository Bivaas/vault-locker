import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import dotenv from 'dotenv'

import { clerkMiddleware, getAuth } from '@clerk/express'

// env setup
dotenv.config()


const url = process.env.MONGO_URI
const client = new MongoClient(url)
const dbName = 'passop'


const app = express()
const port = 3000


app.use(express.json())
app.use(cors({ origin: "https://vaultlocker.vercel.app"}))

app.use (clerkMiddleware())


// connection with client 
client.connect()

// get route for gettin passwords
app.get('/', async (req, res) => { 

   const { userId } = getAuth(req)

    if (!userId) return res.status(401).json ({ error: "Sign in first !!" })

    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.find( { userId }).toArray()
    res.json(findResult)

})

// savin password
app.post ('/', async (req, res) => { 

    const { userId } = getAuth(req)
    if (!userId) return res.status(401).json({ error: "Sign in first !!" })

    const password = {...req.body, userId }
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password)
    res.send({ success: true, result: findResult })

})


// passwd delete using uuid 
app.delete ('/', async (req, res) => { 
    
    const { userId } = getAuth(req)
    if (!userId) return res.status(401).json({ error: "Sign in first !! "})

    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne({ id: req.body.id, userId })

    res.send({ success: true, result: findResult })

})


if (process.env.NODE_ENV !== 'production') {

    app.listen(port, () => { 

        console.log(`Listening on ${port}`)
    })
}

export default app