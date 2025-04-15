const cors = require('cors');
app.use(cors());
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const client = new MongoClient(process.env.MONGODB_URI);
client.connect();

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;
  const db = client.db();
  const user = await db.collection('Users').findOne({ Login: login, Password: password });

  if (!user) return res.status(200).json({ id: -1 });
  res.status(200).json({ id: user.UserId, firstName: user.FirstName, lastName: user.LastName });
});

app.post('/api/addcard', async (req, res) => {
  const { userId, card } = req.body;
  const db = client.db();
  await db.collection('Cards').insertOne({ UserId: userId, Card: card });
  res.status(200).json({ error: '' });
});

app.post('/api/searchcards', async (req, res) => {
  const { userId, search } = req.body;
  const db = client.db();
  const results = await db.collection('Cards')
    .find({ UserId: userId, Card: { $regex: search, $options: 'i' } })
    .toArray();
  res.status(200).json({ results: results.map(r => r.Card), error: '' });
});

app.listen(5000, () => console.log('Server running on port 5000'));

