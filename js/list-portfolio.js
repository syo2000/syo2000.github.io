const POSTS_PER_PAGE_PORT = 5;
let currentPagePort = 1;
let currentFilterTagPor = null;

const newPors = [
  {
    tags: ["HTML", "CSS", "JS", "BootStrap", "JQuery", "PHP"],
    title: "Pizza Shop WebSite",
    link: "https://github.com/syo2000/Pizza-Shop-Website",
    content: "Building a Website according to the MVC model.Use: HTML, CSS, JS, BootStrap, JQuery, PHP.",
    image: "images/porfolio/pro6.png",
  },
  {
    tags: ["Python"],
    title: "Image Processing",
    link: "https://github.com/syo2000/Image-Processing",
    content: "Python Language, use the following libraries: PIL, numpy, matplotlib. Change image brightness, image contrast, flip photos horizontally/vertically, blur photos, black and white photos.",
    image: "images/porfolio/pro5.png",
  },
  {
    tags: ["SQL"],
    title: "Building and Mining Data Warehouse",
    link: "https://github.com/syo2000/BUILDING-AND-MINING-DATA-WAREHOUSE",
    content: "Design a Star or Snowflake data model diagram through the Multidimensional Design from analytical business requirements and OLTP system. Deploy the ETL procedure to extracting data from disparate databases and data sources, and then transforming the data for effective integration into a data warehouse using SSIS tool. Operate the basic OLAP technologies using SSAS tool. Create dashboard and other visualizations to analyze and communicate the data from DW using PowerBI. Applying the data mining algorithms in Analysis Services to your data.",
    image: "images/porfolio/pro4.jpg",
  },
  {
    tags: ["SQL"],
    title: "Hospital information management",
    link: "https://github.com/syo2000/Security-Issues-in-Information-Systems/tree/main/Project",
    content: "Use Oracle. Building Class Diagram for hospital information management model. Create and grant permissions to user/role. Security policy settings DAC, RABC, Audit, ...",
    image: "images/porfolio/pro3.png",
  },
  {
    tags: ["SQL", "Power BI"],
    title: "Analysis and visualize data with PowerBI",
    link: "https://github.com/syo2000/AdventureWorks2019_Analysis_and_Visualization_with_PowerBI",
    content: "Visualize data with PowerBI tools. The data set used is AdventureWorks. Connect data from MS SQL Server. ETL data using PowerBI's Power Query tool. Create some Dashboards about Customers and Product.",
    image: "images/porfolio/pro2.jpg",
  },
  {
    tags: ["SQL", "Python", "Machine Learning"],
    title: "Customer Group Segmentation",
    link: "https://github.com/syo2000/RFM_K-MEAN_Adventurework_2012_with_Python",
    content: "Segment customer groups based on RFM indicators. The data set used is AdventureWorks. Data is stored in MS SQL and exported to an excel file. Cleaning and Exploratory data in Python language (Numpy, Pandas, Matplotlib). Using the K Mean algorithm to group customers based on three RFM indicators.",
    image: "images/porfolio/pro1.png",
  }
];

// ========== RENDER TOP 5 ==========
function renderTop5Projects() {
  const container = document.getElementById("por-container-top-5");
  if (!container) return;

  const top5 = [...newPors].slice(-5).reverse();
  top5.forEach(project => {
    const newPost = document.createElement("article");
    newPost.className = "blog-post";
    newPost.innerHTML = `
      <div class="blog-post-thumb">
        <img src="${project.image}" alt="project-thumbnail" />
      </div>
      <div class="blog-post-content">
        <div class="blog-post-title">
          <a href="${project.link}">${project.title}</a>
        </div>
        <div class="blog-post-tag">${project.tags.map(tag =>
          `<a href="#" class="tag-link" data-tag="${tag}">${tag}</a>`).join(" ")}</div>
        <div class="blog-post-meta">
          <ul><li>By <a href="about.html">Duong Le</a></li></ul>
        </div>
        <p>${project.content}</p>
        <a href="${project.link}" class="blog-post-action">read more <i class="fa fa-angle-right"></i></a>
      </div>
    `;
    container.appendChild(newPost);

    newPost.querySelectorAll(".tag-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        filterByTagPor(e.target.dataset.tag);
      });
    });
  });
}

// ========== RENDER TOÀN BỘ DỰ ÁN ==========
function addNewPor({ tags, title, content, image, link }) {
  const container = document.getElementById("por-container");
  const newPost = document.createElement("article");
  newPost.className = "blog-post";

  const tagLinks = tags.map(tag =>
    `<a href="#" class="tag-link" data-tag="${tag}">${tag}</a>`).join(" ");

  newPost.innerHTML = `
    <div class="blog-post-thumb">
      <img src="${image}" alt="project-thumbnail" />
    </div>
    <div class="blog-post-content">
      <div class="blog-post-title">
        <a href="${link}">${title}</a>
      </div>
      <div class="blog-post-tag">${tagLinks}</div>
      <div class="blog-post-meta">
        <ul><li>By <a href="about.html">Duong Le</a></li></ul>
      </div>
      <p>${content}</p>
      <a href="${link}" class="blog-post-action">read more <i class="fa fa-angle-right"></i></a>
    </div>
  `;

  container.appendChild(newPost);

  newPost.querySelectorAll(".tag-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      filterByTagPor(e.target.dataset.tag);
    });
  });
}

// ========== LỌC TAG ==========
function filterByTagPor(tag) {
  currentFilterTagPor = (tag === "All") ? null : tag;
  currentPagePort = 1;
  renderCurrentPagePor();
}

// ========== PHÂN TRANG ==========
function renderPaginationPor(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    li.innerHTML = `
      <a class="page-link ${i === currentPagePort ? "active" : ""}" href="#">${i}</a>
    `;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPagePort = i;
      renderCurrentPagePor();
    });
    paginationContainer.appendChild(li);
  }

  if (currentPagePort < totalPages) {
    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    nextLi.innerHTML = `<a class="page-link" href="#"><i class="fa fa-angle-right"></i></a>`;
    nextLi.addEventListener("click", (e) => {
      e.preventDefault();
      currentPagePort++;
      renderCurrentPagePor();
    });
    paginationContainer.appendChild(nextLi);
  }
}

// ========== RENDER THEO TRANG ==========
function renderCurrentPagePor() {
  const container = document.getElementById("por-container");
  if (!container) return;

  container.innerHTML = "";

  let filtered = newPors;
  if (currentFilterTagPor) {
    filtered = newPors.filter(p => p.tags.includes(currentFilterTagPor));
  }

  const reversed = [...filtered].reverse();
  const start = (currentPagePort - 1) * POSTS_PER_PAGE_PORT;
  const end = start + POSTS_PER_PAGE_PORT;
  const currentProjects = reversed.slice(start, end);

  currentProjects.forEach(addNewPor);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE_PORT);
  renderPaginationPor(totalPages);

  window.scrollTo({
    top: container.offsetTop - 30,
    behavior: "smooth"
  });

  renderTagFilterButtonsPor();
}

// ========== RENDER NÚT FILTER ==========
function renderTagFilterButtonsPor() {
  const tagFilterContainer = document.getElementById("por-tag-filter-buttons");
  if (!tagFilterContainer) return;

  tagFilterContainer.innerHTML = "";

  // All Projects button
  const allLi = document.createElement("li");
  allLi.className = "category-item";

  const allLink = document.createElement("a");
  allLink.href = "#";
  allLink.dataset.tag = "All";
  allLink.className = "category-link" + (currentFilterTagPor === null ? " active" : "");
  allLink.textContent = "All Projects";

  allLink.addEventListener("click", (e) => {
    e.preventDefault();
    filterByTagPor("All");
  });

  allLi.appendChild(allLink);
  tagFilterContainer.appendChild(allLi);

  // Build tag count
  const tagCounts = {};
  newPors.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Render each tag
  Object.entries(tagCounts).forEach(([tag, count]) => {
    const li = document.createElement("li");
    li.className = "category-item";

    const link = document.createElement("a");
    link.href = "#";
    link.dataset.tag = tag;
    link.className = "category-link" + (currentFilterTagPor === tag ? " active" : "");
    link.textContent = `${tag} (${count})`;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      filterByTagPor(tag);
    });

    li.appendChild(link);
    tagFilterContainer.appendChild(li);
  });
}


// ========== KHỞI TẠO ==========
document.addEventListener("DOMContentLoaded", function () {
  renderCurrentPagePor();
  renderTop5Projects();
});
