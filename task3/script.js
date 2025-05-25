let posts = [];
let currentPage = 1;
const postsPerPage = 3;

document.getElementById("postForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title && content) {
    posts.unshift({ title, content, createdAt: new Date().toLocaleString() });
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    renderPosts();
  }
});

function searchPosts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );
  renderPosts(filtered);
}

function renderPosts(filteredPosts = null) {
  const container = document.getElementById("postsContainer");
  const pagination = document.getElementById("pagination");
  const data = filteredPosts || posts;

  const totalPages = Math.ceil(data.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const currentData = data.slice(start, start + postsPerPage);

  container.innerHTML = "";
  if (currentData.length === 0) {
    container.innerHTML = "<p class='text-muted'>No posts found.</p>";
  } else {
    currentData.forEach((post) => {
      container.innerHTML += `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.content}</p>
            <small class="text-muted">${post.createdAt}</small>
          </div>
        </div>
      `;
    });
  }

  // Pagination controls
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <button class="page-link" onclick="changePage(${i})">${i}</button>
      </li>
    `;
  }
}

function changePage(page) {
  currentPage = page;
  renderPosts();
}

// Initial rendering
renderPosts();
