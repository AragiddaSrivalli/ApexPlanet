// Login validation
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Updated valid credentials
  if (username === "miniblogger" && password === "blog2025") {
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "welcome.html";
  } else {
    document.getElementById("error").textContent = "Invalid credentials!";
  }
});

// Logout button
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
});

// Redirect unauthorized users
if (window.location.pathname.includes("welcome.html") || window.location.pathname.includes("posts.html")) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html";
  }
}

// Blog post logic
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");

function displayPosts() {
  postsContainer.innerHTML = "";
  const searchTerm = searchInput?.value.toLowerCase() || "";
  posts
    .filter((post) => post.title.toLowerCase().includes(searchTerm) || post.content.toLowerCase().includes(searchTerm))
    .forEach((post, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <div class="post-actions">
          <button onclick="editPost(${index})">Edit</button>
          <button class="delete" onclick="deletePost(${index})">Delete</button>
        </div>
      `;
      postsContainer.appendChild(li);
    });
}

window.editPost = function (index) {
  const post = posts[index];
  document.getElementById("postTitle").value = post.title;
  document.getElementById("postContent").value = post.content;
  document.getElementById("postIndex").value = index;
  document.getElementById("cancelEditBtn").classList.remove("hidden");
};

window.deletePost = function (index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
  }
};

postForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const index = document.getElementById("postIndex").value;

  if (title && content) {
    if (index === "") {
      posts.push({ title, content });
    } else {
      posts[index] = { title, content };
      document.getElementById("cancelEditBtn").classList.add("hidden");
    }
    localStorage.setItem("posts", JSON.stringify(posts));
    postForm.reset();
    document.getElementById("postIndex").value = "";
    displayPosts();
  }
});

document.getElementById("cancelEditBtn")?.addEventListener("click", () => {
  postForm.reset();
  document.getElementById("postIndex").value = "";
  document.getElementById("cancelEditBtn").classList.add("hidden");
});

searchInput?.addEventListener("input", displayPosts);

// Initialize display
displayPosts();
