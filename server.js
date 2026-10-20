const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const client = new MongoClient('YOUR_MONGODB_CONNECTION_STRING');

async function start() {
    await client.connect();

    const students = client.db('studentDB').collection('students');

    // READ
    app.get('/api/students', async (req, res) => {
        res.json(await students.find().toArray());
    });

    // CREATE
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
        res.json({ success: true });
    });

    // DELETE
    app.delete('/api/students/:id', async (req, res) => {
        await students.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.json({ success: true });
    });

    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
}

start().catch(console.error);
```
