// public/login.js
const { createClient } = supabase;
const supabaseClient = supabase.createClient(
  "https://erwssixkrsrpvhqkyqeq.supabase.co",
  "TON_ANON_KEY_ICI"
);

// Inscription
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert("Compte créé !");
      window.location.href = "/dashboard.html";
    }
  });
}

// Connexion
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Erreur : " + error.message);
    } else {
      window.location.href = "/dashboard.html";
    }
  });
}
