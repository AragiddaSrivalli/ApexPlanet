// Client-side form validation

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginForm.addEventListener('submit', function(e) {
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  if (username === '' || password === '') {
    alert("Please fill in all login fields.");
    e.preventDefault();
  }
});

registerForm.addEventListener('submit', function(e) {
  const username = registerForm.username.value.trim();
  const password = registerForm.password.value.trim();
  const role = registerForm.role.value;

  if (username === '' || password === '' || role === '') {
    alert("Please complete all registration fields.");
    e.preventDefault();
  }
});
