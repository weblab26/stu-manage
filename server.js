
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const client = new MongoClient('mongodb+srv://<username>:<password>zfarwj.mongodb.net/');

async function start() {
    await client.connect();
    console.log('MongoDB connected');

    const students = client.db('studentDB').collection('students');

    // READ
    app.get('/api/students', async (req, res) => {
        res.json(await students.find().toArray());
    });

    // ADD
    app.post('/api/students', async (req, res) => {
        const result = await students.insertOne(req.body);
        res.json({ _id: result.insertedId, ...req.body });
    });

    // UPDATE
    app.put('/api/students/:id', async (req, res) => {
        await students.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json({ message: 'Student updated' });
    });

    // DELETE
    app.delete('/api/students/:id', async (req, res) => {
        await students.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.json({ message: 'Student deleted' });
    });

    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
}

start().catch(console.error);

//npm.cmd install express mongodb  
//server.js

