const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getSongsByMood } = require('./spotify');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommend', async (req, res) => {
  const { mood, activity, genre } = req.body;
  try {
    const songs = await getSongsByMood(mood, activity, genre);
    res.json({ songs });
  } catch (err) {
    res.status(500).send('Error fetching songs');
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
