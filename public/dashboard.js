const api = 'http://localhost:3000';
const user_id = localStorage.getItem('user_id');

if (!user_id) window.location.href = "index.html";

async function addArtist() {
  const artist_name = document.getElementById('artistName').value;
  await fetch(`${api}/add-artist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, artist_name })
  });
  loadArtists();
}

async function loadArtists() {
  const res = await fetch(`${api}/get-artists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id })
  });
  const data = await res.json();
  const list = document.getElementById('artistList');
  list.innerHTML = "";
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.artist_name;
    list.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem('user_id');
  window.location.href = "index.html";
}

loadArtists();
