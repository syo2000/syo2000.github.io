const POSTS_PER_PAGE_PORT = 5; // Số bài viết mỗi trang
let currentPagePort = 1; 
  // Dữ liệu global
const newPors = [
  {
    tag: "HTML, CSS, JS, BootStrap, JQuery, PHP",
    title: "Pizza Shop WebSite",
    link: "https://github.com/syo2000/Pizza-Shop-Website",
    content: "Building a Website according to the MVC model.Use: HTML, CSS, JS, BootStrap, JQuery, PHP.",
    image: "images/porfolio/pro6.png",
    
  },
  {
    tag: "Python",
    title: "Image Processing",
    link: "https://github.com/syo2000/Image-Processing",
    content: "Python Language, use the following libraries: PIL, numpy, matplotlib. Change image brightness, image contrast, flip photos horizontally/vertically, blur photos, black and white photos.",
    image: "images/porfolio/pro5.png",
    
  },
  {
    tag: "SQL",
    title: "Building and Mining Data Warehouse",
    link: "https://github.com/syo2000/BUILDING-AND-MINING-DATA-WAREHOUSE",
    content: "Design a Star or Snowflake data model diagram through the Multidimensional Design from analytical business requirements and OLTP system. Deploy the ETL procedure to extracting data from disparate databases and data sources, and then transforming the data for effective integration into a data warehouse using SSIS tool. Operate the basic OLAP technologies using SSAS tool. Create dashboard and other visualizations to analyze and communicate the data from DW using PowerBI. Applying the data mining algorithms in Analysis Services to your data.",
    image: "images/porfolio/pro4.jpg",
    
  },
  {
    tag: "SQL",
    title: "Hospital information management",
    link: "https://github.com/syo2000/Security-Issues-in-Information-Systems/tree/main/Project",
    content: "Use Oracle. Building Class Diagram for hospital information management model. Create and grant permissions to user/role. Security policy settings DAC, RABC, Audit, ...",
    image: "images/porfolio/pro3.png",
    
  },
  {
    tag: "SQL",
    title: "Analysis and visualize data with PowerBI",
    link: "https://github.com/syo2000/AdventureWorks2019_Analysis_and_Visualization_with_PowerBI",
    content: "Visualize data with PowerBI tools. The data set used is AdventureWorks. Connect data from MS SQL Server. ETL data using PowerBI's Power Query tool. Create some Dashboards about Customers and Product.",
    image: "images/porfolio/pro2.jpg",
    
  },
  {
    tag: "SQL",
    title: "Customer Group Segmentation",
    link: "https://github.com/syo2000/RFM_K-MEAN_Adventurework_2012_with_Python",
    content: "Segment customer groups based on RFM indicators. The data set used is AdventureWorks. Data is stored in MS SQL and exported to an excel file. Cleaning and Exploratory data in Python language (Numpy, Pandas, Matplotlib). Using the K Mean algorithm to group customers based on three RFM indicators.",
    image: "images/porfolio/pro1.png",
    
  }
  
];


// Hàm thêm Top 5 bài viết
function renderTop5Projects() {
  const porContainerTop5 = document.getElementById("por-container-top-5");
  if (!porContainerTop5) return;

  const top5 = [...newPors].slice(-5).reverse();
  top5.forEach(addTop5NewPost);
}

// Hàm thêm tất cả bài viết
function renderAllProjects() {
  const porContainer = document.getElementById("por-container");
  if (!porContainer) return;

  newPors.forEach(addNewPor);
}

// DOM loaded xong mới gọi
document.addEventListener("DOMContentLoaded", function () {
  renderTop5Projects();
  renderCurrentPage();
});

// Hàm hiển thị từng bài
function addNewPor({ tag, title, content, image, link }) {
  const porContainer = document.getElementById("por-container");
  const newPost = document.createElement("article");
  newPost.className = "blog-post";
  newPost.innerHTML = `
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
        </ul>
      </div>
      <p>${content}</p>
      <a href="${link}" class="blog-post-action">read more <i class="fa fa-angle-right"></i></a>
    </div>
  `;
  porContainer.appendChild(newPost); // ✅ Đúng thứ tự
}

function addTop5NewPost({ tag, title, content, image, link }) {
  const porContainerTop5 = document.getElementById("por-container-top-5");
  const newPost = document.createElement("article");
  newPost.className = "blog-post";
  newPost.innerHTML = `
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
          
        </ul>
      </div>
      <p>${content}</p>
      <a href="${link}" class="blog-post-action">read more <i class="fa fa-angle-right"></i></a>
    </div>
</article>
  `;
  porContainerTop5.appendChild(newPost);
}

//TẠO HÀM RENDER PHÂN TRANG
function renderPagination(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Xóa phân trang cũ

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    li.innerHTML = `
      <a class="page-link ${i === currentPagePort ? "active" : ""}" href="#">${i}</a>
    `;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPagePort = i;
      renderCurrentPage();
    });
    paginationContainer.appendChild(li);
  }

  // Nút next
  if (currentPagePort < totalPages) {
    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    nextLi.innerHTML = `<a class="page-link" href="#"><i class="fa fa-angle-right"></i></a>`;
    nextLi.addEventListener("click", (e) => {
      e.preventDefault();
      currentPagePort++;
      renderCurrentPage();
    });
    paginationContainer.appendChild(nextLi);
  }
}

// RENDER DỮ LIỆU THEO TRANG
function renderCurrentPage() {
  const porContainer = document.getElementById("por-container");
  if (!porContainer) return;

  porContainer.innerHTML = ""; // Xóa nội dung cũ

  const reversedPors = [...newPors].reverse(); // đảo thứ tự, bài mới nhất lên đầu
  const start = (currentPagePort - 1) * POSTS_PER_PAGE_PORT;
  const end = start + POSTS_PER_PAGE_PORT;
  const currentPosts = reversedPors.slice(start, end);

  currentPosts.forEach(addNewPor);

  const totalPages = Math.ceil(newPors.length / POSTS_PER_PAGE_PORT);
  renderPagination(totalPages);
  window.scrollTo({
    top: document.getElementById("por-container").offsetTop - 30,
    behavior: "smooth"
  });
}
