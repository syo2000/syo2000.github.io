const POSTS_PER_PAGE_BLOG = 5; // Số bài viết mỗi trang
let currentPageBlog = 1;
let currentFilterTag = null; // New variable to store the currently active filter tag

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

    blogContainerTop5.innerHTML = ""; // Clear previous content

    const top5 = [...newBlogs].slice(-5).reverse();
    top5.forEach(addTop5newPosts);
}

// Function to handle tag click (for both post tags and sidebar filter buttons)
function filterByTag(tag) {
    currentFilterTag = (tag === "All") ? null : tag; // If "All" is clicked, clear filter
    currentPageBlog = 1; // Reset to first page when applying a new filter
    renderCurrentPage();

    // Update active class for sidebar filter buttons
    const tagButtons = document.querySelectorAll("#tag-filter-buttons a");
    tagButtons.forEach(button => {
        if (button.dataset.tag === tag) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

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
                <a href="#" class="tag-link" data-tag="${tag}">${tag}</a>
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
    `;
    BlogContainer.appendChild(newPosts);

    // Attach event listener to the tag link on the post itself
    newPosts.querySelector(".tag-link").addEventListener("click", (e) => {
        e.preventDefault();
        const clickedTag = e.target.dataset.tag;
        filterByTag(clickedTag);
    });
}

function addTop5newPosts({ tag, title, content, image, link, date }) {
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
    `;
    blogContainerTop5.appendChild(newPosts);
}

// This function will create the tag filter buttons in the sidebar
function renderTagFilterButtons() {
    const tagFilterContainer = document.getElementById("tag-filter-buttons");
    if (!tagFilterContainer) return;

    // Clear all old buttons, and re-add the "All Posts" button as the first one
    tagFilterContainer.innerHTML = ''; // Clear everything first
    const allPostsLink = document.createElement('a');
    allPostsLink.href = "#";
    allPostsLink.dataset.tag = "All";
    allPostsLink.classList.add('tag-link'); // Add tag-link class for consistency with other tag links
    if (currentFilterTag === null) {
        allPostsLink.classList.add('active');
    }
    allPostsLink.textContent = "All Posts";
    tagFilterContainer.appendChild(allPostsLink);

    // Attach event listener for the "All Posts" button
    allPostsLink.addEventListener('click', (e) => {
        e.preventDefault();
        filterByTag('All');
    });

    const uniqueTags = new Set();
    const tagCounts = {};

    newBlogs.forEach(post => {
        uniqueTags.add(post.tag);
        tagCounts[post.tag] = (tagCounts[post.tag] || 0) + 1;
    });

    uniqueTags.forEach(tag => {
        const link = document.createElement("a");
        link.href = "#";
        link.dataset.tag = tag;
        link.classList.add('tag-link'); // Add tag-link class for consistency
        const isActive = (currentFilterTag === tag) ? "active" : "";
        if (isActive) {
            link.classList.add("active");
        }
        link.textContent = `${tag} (${tagCounts[tag]})`;
        tagFilterContainer.appendChild(link);

        link.addEventListener("click", (e) => {
            e.preventDefault();
            const clickedTag = e.target.dataset.tag;
            filterByTag(clickedTag);
        });
    });
}


//TẠO HÀM RENDER PHÂN TRANG
function renderPagination(totalPages) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = ""; // Xóa phân trang cũ

    // Render page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = "page-item";
        // Active class only applies to page numbers when NO tag filter is active
        li.innerHTML = `
            <a class="page-link ${i === currentPageBlog && currentFilterTag === null ? "active" : ""}" href="#">${i}</a>
        `;
        li.addEventListener("click", (e) => {
            e.preventDefault();
            currentPageBlog = i;
            renderCurrentPage();
        });
        paginationContainer.appendChild(li);
    }

    // Next button
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

    BlogContainer.innerHTML = ""; // Clear old content

    // Filter posts based on currentFilterTag
    let filteredPosts = newBlogs;
    if (currentFilterTag) {
        filteredPosts = newBlogs.filter(post => post.tag === currentFilterTag);
    }

    const reversedPosts = [...filteredPosts].reverse(); // Sort by newest first
    const start = (currentPageBlog - 1) * POSTS_PER_PAGE_BLOG;
    const end = start + POSTS_PER_PAGE_BLOG;
    const currentPosts = reversedPosts.slice(start, end);

    currentPosts.forEach(addNewBlog);

    // Calculate total pages based on filtered posts
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE_BLOG);
    renderPagination(totalPages);
    window.scrollTo({
        top: document.getElementById("blog-container").offsetTop - 30,
        behavior: "smooth"
    });
    // After rendering posts and pagination, re-render tag filter buttons to update counts and active state
    renderTagFilterButtons();
}

// Call functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    renderTop5Blogs();
    renderCurrentPage(); // renderCurrentPage will call renderTagFilterButtons
});
