const api = 'http://localhost:3000';

async function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${api}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) alert("Compte créé !");
  else alert(data.error);
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${api}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('user_id', data.user.id);
    window.location.href = "dashboard.html";
  } else {
    alert(data.error);
  }
}
