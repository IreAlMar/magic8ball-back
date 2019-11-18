import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const port = 8000;

app.use(bodyParser.json());

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('magic8ball');

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}

app.post('/magic8ball/api/answers/', async (req, res) => {
    // Control empty question
    const { question } = req.body;
    const insert = {
        question: question,
        date: new Date(),
    };

    withDB(async (db) => {
        await db.collection('questions').insertOne(insert, function (err, res) {
            if (err) throw err;
            console.log("1 question inserted");
        });

        await db.collection('answers').aggregate([
            { $sample: { size: 1 } }
        ]).toArray(function (err, data) {
            if (err) {
                throw err
            } else {
                const answer = data[0];
                res.status(200).json(answer.value);
            }
        });
    });
});

app.listen((port), () =>
    console.log(`Listening on port ${port}`)
);
