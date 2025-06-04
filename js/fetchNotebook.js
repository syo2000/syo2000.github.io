const notebookRawUrlMap = {
    "python-introduction.html": "HackerRank/blob/main/Python/%F0%9F%8D%8A_Python_Introduction_HackerRank.ipynb"
};

// Metadata cho slider
const pageToMetadataMap = {
    "python-introduction.html": {
        tag: "PYTHON",
        title: "HackerRank Python Introduction",
        date: "Jan 11, 2025",
        image: "../../../images/blog/python-hackerrank-single.png",
        link: "https://github.com/syo2000/HackerRank/blob/main/Python/%F0%9F%8D%8A_Python_Introduction_HackerRank.ipynb"
    }
}; 

function loadNotebookViewer(url) {
    const nbviewerUrl = `https://nbviewer.org/github/syo2000/${encodeURIComponent(url).replace(/^https?:\/\//, '')}`;
    document.getElementById('content');
   
    

    // Gắn iframe toàn màn hình
    content.innerHTML = `
        <iframe 
            src="${nbviewerUrl}" 
            style="display: block; width: 100%; height: calc(100vh - 150px); border: none; margin: 0; padding: 0;" 
            frameborder="0">
        </iframe>
    `;
}

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

const page = window.location.pathname.split("/").pop().toLowerCase();

const notebookLink = notebookRawUrlMap[page];
const metadata = pageToMetadataMap[page];

if (notebookLink) {
    loadNotebookViewer(notebookLink);
} else {
    document.getElementById('content').innerHTML = `<p>Loading...</p>`;
}

updateSliderMetadata(metadata);
