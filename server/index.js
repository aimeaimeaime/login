// server/index.js
const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.status(200).json(data);
});

app.post('/add-artist', async (req, res) => {
  const { user_id, artist_name } = req.body;
  const { error } = await supabase.from('artists').insert([{ user_id, artist_name }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ success: true });
});

app.post('/get-artists', async (req, res) => {
  const { user_id } = req.body;
  const { data, error } = await supabase.from('artists').select('*').eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});




app.use(express.static('public'));

app.get('*', (req, res) => {
  res.status(404).send('Page non trouvée');
});


app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
