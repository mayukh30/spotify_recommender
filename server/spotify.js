const axios = require('axios');

let token = '';

async function getAccessToken() {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`,
      },
    }
  );
  token = response.data.access_token;
}

async function getSongsByMood(mood, activity, genre) {
  if (!token) await getAccessToken();
  
const queryParts = [mood, activity, genre, language].filter(Boolean);
const query = queryParts.join(' ');

  const res = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: query, type: 'track', limit: 10 },
  });

  return res.data.tracks.items.map(track => ({
    name: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    preview: track.preview_url,
    image: track.album.images[0]?.url,
    link: track.external_urls.spotify
  }));
}

module.exports = { getSongsByMood };
