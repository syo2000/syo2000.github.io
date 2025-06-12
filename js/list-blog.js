const POSTS_PER_PAGE_BLOG = 5; // Số bài viết mỗi trang
let currentPageBlog = 1; 

const newBlogs = [
  {
    tag: "SQL",
    date: "May 29, 2021",
    title: "HackerRank SQL Basic Select",
    link: "blog/hackerrank/sql/sql-basic-select.html",
    content: "",
    image: "images/blog/sql-hackerrank.png",
    image_slider: "images/blog/sql-hackerrank.png"
  },
  {
    tag: "SQL",
    date: "May 29, 2021",
    title: "HackerRank SQL Aggregation",
    link: "blog/hackerrank/sql/sql-aggregation.html",
    content: "",
    image: "images/blog/sql-hackerrank.png",
    image_slider: "images/blog/sql-hackerrank.png"
  },
  {
    tag: "SQL",
    date: "May 29, 2021",
    title: "HackerRank SQL Advanced",
    link: "blog/hackerrank/sql/sql-advanced-select.html",
    content: "",
    image: "images/blog/sql-hackerrank.png",
    image_slider: "images/blog/sql-hackerrank.png"
  },
  {
    tag: "Python",
    date: "Jan 11, 2025",
    title: "HackerRank Python Introduction",
    link: "blog/hackerrank/python/python-introduction.html",
    content: "",
    image: "images/blog/python-hackerrank.png",
    image_slider: "images/blog/python-hackerrank.png"
  },
  {
    tag: "SQL",
    date: "June 12, 2025",
    title: "HackerRank SQL Basic Join",
    link: "blog/hackerrank/sql/sql-basic-join.html",
    content: "",
    image: "images/blog/sql-hackerrank.png",
    image_slider: "images/blog/sql-hackerrank.png"
  }
];

// Hàm thêm Top 5 bài viết
function renderTop5Blogs() {
  const blogContainerTop5 = document.getElementById("blog-container-top-5");
  if (!blogContainerTop5) return;

  const top5 = [...newBlogs].slice(-5).reverse();
  top5.forEach(addTop5newPosts);
}

// Hàm thêm tất cả bài viết
function renderAllBlogs() {
  const BlogContainer = document.getElementById("blog-container");
  if (!BlogContainer) return;

  newBlogs.forEach(addNewBlog);
}

// DOM loaded xong mới gọi
document.addEventListener("DOMContentLoaded", function () {
  renderTop5Blogs();
  renderCurrentPage();
});

// Hàm hiển thị từng bài
function addNewBlog({ tag, title, content, image, link, date }) {
  const BlogContainer = document.getElementById("blog-container");
  const newPosts = document.createElement("article");
  newPosts.className = "blog-post";
  newPosts.innerHTML = `
  
  <div class="blog-post-thumb">
  <img src="${image}" alt="blog-thum" />
</div>

<div class="blog-post-content">
  
  <div class="blog-post-title">
    <a href="${link}">${title}</a>
  </div>
  <div class="blog-post-tag">
    <a href="">${tag}</a>
  </div>
  <div class="blog-post-meta">
    <ul>
      <li>By <a href="about.html">Duong Le</a></li>
      <li>
          <i class="fa fa-clock-o"></i>
          ${date}
      </li>
    </ul>
  </div>
  <p>${content}</p>
  <a href="${link}" class="blog-post-action">read more <i class="fa fa-angle-right"></i></a>
</div>
</article>
  `;
  BlogContainer.appendChild(newPosts);
}

function addTop5newPosts({ tag, title, content, image, link ,date}) {
  const blogContainerTop5 = document.getElementById("blog-container-top-5");
  const newPosts = document.createElement("div");
  newPosts.className = "latest-widget";
  newPosts.innerHTML = `
  <div class="latest-widget-thum">
              <a href="${link}">
                <img src="${image}" alt="blog-thum" /></a>
              <div class="icon">
                <a href="${link}">
                  <img src="images/blog/icon.svg" alt="icon" /></a>
              </div>
            </div>
            <div class="latest-widget-content">
              <div class="content-title">
                <a href="${link}">${title}</a>
              </div>
              <div class="content-meta">
                <ul>
                  <li>
                    <i class="fa fa-clock-o"></i>
                    ${date}
                  </li>
                </ul>
              </div>
            </div>
          </div>
  `;
  blogContainerTop5.appendChild(newPosts);
}


//TẠO HÀM RENDER PHÂN TRANG
function renderPagination(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Xóa phân trang cũ

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    li.innerHTML = `
      <a class="page-link ${i === currentPageBlog ? "active" : ""}" href="#">${i}</a>
    `;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPageBlog = i;
      renderCurrentPage();
    });
    paginationContainer.appendChild(li);
  }

  // Nút next
  if (currentPageBlog < totalPages) {
    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    nextLi.innerHTML = `<a class="page-link" href="#"><i class="fa fa-angle-right"></i></a>`;
    nextLi.addEventListener("click", (e) => {
      e.preventDefault();
      currentPageBlog++;
      renderCurrentPage();
    });
    paginationContainer.appendChild(nextLi);
  }
}

// RENDER DỮ LIỆU THEO TRANG
function renderCurrentPage() {
  const BlogContainer = document.getElementById("blog-container");
  if (!BlogContainer) return;

  BlogContainer.innerHTML = ""; // Xóa nội dung cũ

  const reversedPors = [...newBlogs].reverse(); // đảo thứ tự, bài mới nhất lên đầu
  const start = (currentPageBlog - 1) * POSTS_PER_PAGE_BLOG;
  const end = start + POSTS_PER_PAGE_BLOG;
  const currentPosts = reversedPors.slice(start, end);

  currentPosts.forEach(addNewBlog);

  const totalPages = Math.ceil(newBlogs.length / POSTS_PER_PAGE_BLOG);
  renderPagination(totalPages);
  window.scrollTo({
    top: document.getElementById("blog-container").offsetTop - 30,
    behavior: "smooth"
  });
}
