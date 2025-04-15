const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    app.post('/api/login', async (req, res) => {
      const { login, password } = req.body;
      const user = await db.collection('Users').findOne({ Login: login, Password: password });

      if (!user) {
        return res.status(200).json({ id: -1 });
      }

      res.status(200).json({
        id: user.UserId,
        firstName: user.FirstName,
        lastName: user.LastName
      });
    });

    app.post('/api/addcard', async (req, res) => {
      const { userId, card } = req.body;
      await db.collection('Cards').insertOne({ UserId: userId, Card: card });
      res.status(200).json({ error: '' });
    });

    app.post('/api/searchcards', async (req, res) => {
      const { userId, search } = req.body;
      const results = await db.collection('Cards')
        .find({ UserId: userId, Card: { $regex: search, $options: 'i' } })
        .toArray();
      res.status(200).json({ results: results.map(r => r.Card), error: '' });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

startServer();


