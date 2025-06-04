// Cấu hình Marked.js
marked.setOptions({
    breaks: true,
    gfm: true
});

// Map HTML file → link Markdown trên GitHub
const pageToMarkdownMap = {
    "sql-basic.html": "https://raw.githubusercontent.com/syo2000/HackerRank/main/SQL/Basic%20Select.md",
    "sql-aggregation.html": "https://raw.githubusercontent.com/syo2000/HackerRank/main/SQL/Aggregation.md",
    "sql-advanced.html": "https://raw.githubusercontent.com/syo2000/HackerRank/main/SQL/Advanced%20Select.md"
};

// Map HTML file → thông tin tiêu đề slider
const pageToMetadataMap = { 
    "sql-basic.html": {
        tag: "SQL",
        title: "HackerRank SQL Basic Select",
        date: "May 29, 2021",
        image: "../../../images/blog/sql-hackerrank-single.png",
        link: "https://github.com/syo2000/HackerRank/blob/main/SQL/Basic%20Select.md"
    },
    "sql-aggregation.html": {
        tag: "SQL",
        title: "HackerRank SQL Aggregation",
        date: "May 29, 2021",
        image: "../../../images/blog/sql-hackerrank-single.png",
        link: "https://github.com/syo2000/HackerRank/blob/main/SQL/Aggregation.md"
    },
    "sql-advanced.html": {
        tag: "SQL",
        title: "HackerRank SQL Advanced",
        date: "May 29, 2021",
        image: "../../../images/blog/sql-hackerrank-single.png",
        link: "https://github.com/syo2000/HackerRank/blob/main/SQL/Advanced%20Select.md"
    }
};

// Lấy tên file hiện tại
const page = window.location.pathname.split("/").pop().toLowerCase();

// 🚀 Load nội dung Markdown nếu có link
async function fetchGitHubContent(markdownUrl) {
    try {
        const response = await fetch(markdownUrl);
        if (!response.ok) {
            throw new Error('Lỗi khi tải nội dung: ' + response.statusText);
        }
        const markdown = await response.text();
        const html = marked.parse(markdown);
        document.getElementById('content').innerHTML = html;

    } catch (error) {
        document.getElementById('content').innerHTML = `<p style="color: red;">❌ Error: ${error.message}</p>`;
    }
}

// 🧠 Cập nhật nội dung slider nếu có metadata
function updateSliderMetadata(meta) {
    if (!meta) return;
    const btn = document.querySelector(".single-blog .tag");
    const title = document.querySelector(".single-blog .title");
    const date = document.querySelector(".single-blog .date");
    
    const image = document.querySelector(".single-blog img");
    const link_github = document.querySelector(".share-now .sociel-icon a");
    
 

    if (btn) btn.innerText = meta.tag;
    if (title) title.innerText = meta.title;
    if (date) date.innerText = meta.date;
    if (image) image.src  = meta.image;
    if (link_github) link_github.href  = meta.link;
}

// 👉 Gọi cả hai chức năng
if (pageToMarkdownMap[page]) {
    fetchGitHubContent(pageToMarkdownMap[page]);
}
updateSliderMetadata(pageToMetadataMap[page]);
