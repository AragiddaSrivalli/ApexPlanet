let isLoggedIn = false;
let posts = [];

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("User registered successfully!");
  this.reset();
});

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  isLoggedIn = true;
  alert("Login successful!");
  document.getElementById("postFormBox").style.display = "block";
});

document.getElementById("postForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  posts.push({ title, content, created_at: new Date().toLocaleString() });
  displayPosts();
  this.reset();
});

function displayPosts() {
  const section = document.getElementById("postsSection");
  section.innerHTML = "<h2>📚 All Posts</h2>";
  posts.forEach(post => {
    section.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>Posted at: ${post.created_at}</small>
      </div>
    `;
  });
}
