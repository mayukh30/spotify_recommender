const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getSongsByMood } = require('./spotify');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/recommend', async (req, res) => {
  const { mood, activity, genre } = req.body;
  try {
    const songs = await getSongsByMood(mood, activity, genre);
    res.json({ songs });
  } catch (err) {
    res.status(500).send('Error fetching songs');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

