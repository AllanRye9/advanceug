import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.SERVER_PORT || ALTER_PORT;

const papers = {
    paper1: [
        {
            id: 1,
            name: "Agriculture Paper 1",
            description: "This is the first paper of the Agriculture subject.",
            value: 42,
            timestamp: new Date().toISOString(),
            status: "active"
        }]
    ,
    paper2: [
        {
            id: 2,
            name: "Agriculture Paper 2",
            description: "This is the second paper of the Agriculture subject.",
            value: 36,
            timestamp: new Date().toISOString(),
            status: "active"
        }
    ],
    paper3: [
        {
            id: 3,
            name: "Agriculture Paper 3",
            description: "This is the third paper of the Agriculture subject.",
            value: 28,
            timestamp: new Date().toISOString(),
            status: "active"
        }
    ]
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/paper1', (req, res) => {
    res.status(200).json(papers.paper1);
});

app.get('/api/paper2', (req, res) => {
    res.status(200).json(papers.paper2);
});

app.get('/api/paper3', (req, res) => {
    res.status(200).json(papers.paper3);
});

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    }
}

start();