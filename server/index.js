const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ✅ Route d'inscription
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

// ✅ Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  res.status(200).json(data);
});

// ✅ Ajouter un artiste lié à un utilisateur
app.post('/add-artist', async (req, res) => {
  const { user_id, artist_name } = req.body;
  const { error } = await supabase.from('artists').insert([{ user_id, artist_name }]);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ success: true });
});

// ✅ Récupérer tous les artistes d’un utilisateur
app.post('/get-artists', async (req, res) => {
  const { user_id } = req.body;
  const { data, error } = await supabase.from('artists').select('*').eq('user_id', user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

// ✅ 🔥 Nouvelle route dynamique : récupérer un utilisateur par ID
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single(); // récupère un seul résultat

  if (error) return res.status(404).json({ error: error.message });
  res.status(200).json(data);
});

// ✅ Page non trouvée
app.get('*', (req, res) => {
  res.status(404).send('Page non trouvée');
});

// ✅ Démarrage du serveur
app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
