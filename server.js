
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const client = new MongoClient('mongodb+srv://<mongo_db_user>:<password>@cluster0.gzfarwj.mongodb.net/');

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
        const student = {
            name: req.body.name,
            regNo: req.body.regNo,
            department: req.body.department
        };
        const result = await students.insertOne(student);
        res.json({ _id: result.insertedId, ...student });
    });

    // UPDATE
    app.put('/api/students/:id', async (req, res) => {
        await students.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: {
                name: req.body.name,
                regNo: req.body.regNo,
                department: req.body.department
            }}
        );
        res.json({ message: 'Updated successfully' });
    });

    // DELETE
    app.delete('/api/students/:id', async (req, res) => {
        await students.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.json({ message: 'Deleted successfully' });
    });

    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
}

start().catch(console.error);
