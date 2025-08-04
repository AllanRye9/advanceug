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

const data = {
    name: "Data Point",
    description: "This is a sample data point",
    value: 42,
    timestamp: new Date().toISOString(),
    status: "active"
}

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/data', (req, res) =>{
    res.status(200).json(data);
});


async function start(){
    try{
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(err){
        console.error('Error starting the server:', err);
        process.exit(1);
    }
}

start();