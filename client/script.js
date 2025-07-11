document.getElementById('songForm').addEventListener('submit', async (e) => {
  e.preventDefault();
const mood = document.getElementById('mood').value;
const activity = document.getElementById('activity').value;
const genre = document.getElementById('genre').value;
const language = document.getElementById('language').value;


  const res = await fetch('https://mayukh30.github.io/spotify_recommender/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood, activity, genre,language })
  });

  const data = await res.json();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = data.songs.map(song => `
    <div class="song-card">
      <img src="${song.image}" />
      <h3>${song.name}</h3>
      <p>${song.artist}</p>
      <audio controls src="${song.preview}"></audio>
      <a href="${song.link}" target="_blank">Open in Spotify</a>
    </div>
  `).join('');
});
