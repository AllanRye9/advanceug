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
    ],
    year: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
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

app.get('/api/:year', (req, res) => {
  const { year } = req.params;
  const yearInt = parseInt(year, 10);

  if (yearInt >= 2000 && yearInt <= 2024) {
    res.status(200).json({ message: `You requested data for year ${year}` });
  } else {
    res.status(404).json({ error: 'Year not supported. Valid range is 2000–2024.' });
  }
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