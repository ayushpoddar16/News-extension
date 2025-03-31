// Import the config module
import { config, loadConfig } from './config.js';

// Function to fetch news from API
const getNews = async () => {
    // Make sure config is loaded
    await loadConfig();
    const apiKey = config.NEWS_API_KEY;
    
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`);
    const data = await res.json();
    const newsList = document.getElementById("news-items");
    
    // Loop through the news articles and create list items
    data.articles.forEach((article, index) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = article.title;
        
        // Modify the event listener to handle 'active' class
        link.addEventListener("click", (event) => {
            // Remove the 'active' class from all list items
            document.querySelectorAll('.news-list li').forEach(item => item.classList.remove('active'));
            
            // Add 'active' class to the clicked list item
            event.target.closest('li').classList.add('active');
    
            // Display the selected news details
            displayNewsDetails(article);
        });
        
        li.appendChild(link);
        newsList.appendChild(li);

        // Set the first item as active by default
        if (index === 0) {
            li.classList.add('active');
            displayNewsDetails(article);
        }
    });
};

// Function to display the details of a selected news
const displayNewsDetails = (article) => {
    const content = document.getElementById("news-content");
    const image = document.getElementById("news-image");
    const link = document.getElementById("news-link");

    content.textContent = article.description || "No description available.";
    image.src = article.urlToImage || "https://via.placeholder.com/400";
    link.href = article.url;
    link.textContent = "Read full article";
};

// On window load, fetch the news
window.addEventListener("load", () => {
    getNews();
});
