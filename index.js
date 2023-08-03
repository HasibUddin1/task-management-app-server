const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// taskManagement
// 1bn7a03m2OWMf7ge



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gkz5fmx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const taskManagementCollection = client.db('taskManagementDB').collection('allTasks')

        app.post('/allTasks', async (req, res) => {
            const task = req.body
            const result = await taskManagementCollection.insertOne(task)
            res.send(result)
        })

        app.get('/allDoingTasks', async (req, res) => {
            const query = { taskStatus: 'doing' }
            const result = await taskManagementCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/allOnHoldTasks', async (req, res) => {
            const query = { taskStatus: 'onHold' }
            const result = await taskManagementCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/allDoneTasks', async (req, res) => {
            const query = { taskStatus: 'done' }
            const result = await taskManagementCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/allArchivedTasks', async (req, res) => {
            const query = { taskStatus: 'archived' }
            const result = await taskManagementCollection.find(query).toArray()
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Task Management server is running')
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})