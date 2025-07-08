const POSTS_PER_PAGE_BLOG = 5;
let currentPageBlog = 1;
let currentFilterTag = null;

const newBlogs = [
    {
        tags: ["SQL"],
        date: "May 29, 2021",
        title: "HackerRank SQL Basic Select",
        link: "blog/hackerrank/sql/sql-basic-select.html",
        content: "",
        image: "images/blog/sql-hackerrank.png",
        image_slider: "images/blog/sql-hackerrank.png"
    },
    {
        tags: ["SQL"],
        date: "May 29, 2021",
        title: "HackerRank SQL Aggregation",
        link: "blog/hackerrank/sql/sql-aggregation.html",
        content: "",
        image: "images/blog/sql-hackerrank.png",
        image_slider: "images/blog/sql-hackerrank.png"
    },
    {
        tags: ["SQL"],
        date: "May 29, 2021",
        title: "HackerRank SQL Advanced",
        link: "blog/hackerrank/sql/sql-advanced-select.html",
        content: "",
        image: "images/blog/sql-hackerrank.png",
        image_slider: "images/blog/sql-hackerrank.png"
    },
    {
        tags: ["Python"],
        date: "Jan 11, 2025",
        title: "HackerRank Python Introduction",
        link: "blog/hackerrank/python/python-introduction.html",
        content: "",
        image: "images/blog/python-hackerrank.png",
        image_slider: "images/blog/python-hackerrank.png"
    },
    {
        tags: ["SQL"],
        date: "June 12, 2025",
        title: "HackerRank SQL Basic Join",
        link: "blog/hackerrank/sql/sql-basic-join.html",
        content: "",
        image: "images/blog/sql-hackerrank.png",
        image_slider: "images/blog/sql-hackerrank.png"
    }
];

// Render Top 5 blogs
function renderTop5Blogs() {
    const blogContainerTop5 = document.getElementById("blog-container-top-5");
    if (!blogContainerTop5) return;

    blogContainerTop5.innerHTML = "";

    const top5 = [...newBlogs].slice(-5).reverse();
    top5.forEach(addTop5newPosts);
}

// Xử lý filter tag
function filterByTag(tag) {
  currentFilterTag = (tag === "All") ? null : tag;
  currentPageBlog = 1;
  renderCurrentPage();

  const tagButtons = document.querySelectorAll("#tag-filter-buttons [data-tag]");
  tagButtons.forEach(button => {
    if (button.dataset.tag === tag) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

// Hiển thị từng bài viết
function addNewBlog({ tags, title, content, image, link, date }) {
    const BlogContainer = document.getElementById("blog-container");
    const newPosts = document.createElement("article");
    newPosts.className = "blog-post";

    const tagLinks = tags.map(tag =>
        `<a href="#" class="tag-link" data-tag="${tag}">${tag}</a>`
    ).join(" ");

    newPosts.innerHTML = `
        <div class="blog-post-thumb">
            <img src="${image}" alt="blog-thum" />
        </div>
        <div class="blog-post-content">
            <div class="blog-post-title">
                <a href="${link}">${title}</a>
            </div>
            <div class="blog-post-tag">${tagLinks}</div>
            <div class="blog-post-meta">
                <ul>
                    <li>By <a href="about.html">Duong Le</a></li>
                    <li><i class="fa fa-clock-o"></i> ${date}</li>
                </ul>
            </div>
            <p>${content}</p>
            <a href="${link}" class="blog-post-action">read more <i class="fa fa-angle-right"></i></a>
        </div>
    `;
    BlogContainer.appendChild(newPosts);

    newPosts.querySelectorAll(".tag-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const clickedTag = e.target.dataset.tag;
            filterByTag(clickedTag);
        });
    });
}

// Hiển thị top 5 bài viết
function addTop5newPosts({ title, image, link, date }) {
    const blogContainerTop5 = document.getElementById("blog-container-top-5");
    const newPosts = document.createElement("div");
    newPosts.className = "latest-widget";
    newPosts.innerHTML = `
        <div class="latest-widget-thum">
            <a href="${link}">
                <img src="${image}" alt="blog-thum" />
            </a>
            <div class="icon">
                <a href="${link}">
                    <img src="images/blog/icon.svg" alt="icon" />
                </a>
            </div>
        </div>
        <div class="latest-widget-content">
            <div class="content-meta">
                <ul>
                    <li>
                       
                        ${date}
                    </li>
                </ul>
            </div>
            <div class="content-title">
                <a href="${link}">${title}</a>
            </div>
            
        </div>
    `;
    blogContainerTop5.appendChild(newPosts);
}

// Render nút filter tag ở sidebar
function renderTagFilterButtons() {
  const tagFilterContainer = document.getElementById("tag-filter-buttons");
  if (!tagFilterContainer) return;

  tagFilterContainer.innerHTML = '';

  // All Posts button
  const allLi = document.createElement("li");
  allLi.className = "category-item";

  const allLink = document.createElement('a');
  allLink.href = "#";
  allLink.dataset.tag = "All";
  allLink.className = 'category-link' + (currentFilterTag === null ? ' active' : '');
  allLink.textContent = "All Blog";

  allLink.addEventListener("click", (e) => {
    e.preventDefault();
    filterByTag("All");
  });

  allLi.appendChild(allLink);
  tagFilterContainer.appendChild(allLi);

  // Other tags
  const tagCounts = {};
  newBlogs.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  Object.entries(tagCounts).forEach(([tag, count]) => {
    const li = document.createElement("li");
    li.className = "category-item";

    const link = document.createElement("a");
    link.href = "#";
    link.dataset.tag = tag;
    link.className = 'category-link' + (currentFilterTag === tag ? ' active' : '');
    link.textContent = `${tag} (${count})`;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      filterByTag(tag);
    });

    li.appendChild(link);
    tagFilterContainer.appendChild(li);
  });
}

// Tạo phân trang
function renderPagination(totalPages) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

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

// Render bài viết theo trang
function renderCurrentPage() {
    const BlogContainer = document.getElementById("blog-container");
    if (!BlogContainer) return;

    BlogContainer.innerHTML = "";

    let filteredPosts = newBlogs;
    if (currentFilterTag) {
        filteredPosts = newBlogs.filter(post => post.tags.includes(currentFilterTag));
    }

    const reversedPosts = [...filteredPosts].reverse();
    const start = (currentPageBlog - 1) * POSTS_PER_PAGE_BLOG;
    const end = start + POSTS_PER_PAGE_BLOG;
    const currentPosts = reversedPosts.slice(start, end);

    currentPosts.forEach(addNewBlog);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE_BLOG);
    renderPagination(totalPages);
    window.scrollTo({
        top: BlogContainer.offsetTop - 30,
        behavior: "smooth"
    });
    renderTagFilterButtons();
}

// Gọi hàm khi DOM ready
document.addEventListener("DOMContentLoaded", function () {
    renderTop5Blogs();
    renderCurrentPage();
});
