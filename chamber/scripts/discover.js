const eventCard = document.querySelector(".events");
const topicsCard = document.querySelector(".topics");
const headlineCard = document.querySelector(".main-content");

// localStorage for Last Visit
document.addEventListener("DOMContentLoaded", () => {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message = '';

    if (lastVisit) {
        const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysBetween < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysBetween} days ago.`;
        }
    } else {
        message = "Welcome! Let us know if you have any questions.";
    }

    // Update both the text content and the data-text attribute for the animation
    const visitorMessageElement = document.getElementById('visitorMessage');
    visitorMessageElement.textContent = message;  // Set visible text
    visitorMessageElement.setAttribute('data-text', message);  // Set data-text for CSS animation

    // Update last visit time in localStorage
    localStorage.setItem('lastVisit', now);
});

// Fetch and render data
async function fetchDataAndRender(filePath, renderFunction) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const data = await response.json();
            renderFunction(data);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Shuffle array and limit to a specified number of items
function shuffleAndLimit(array, limit) {
    return array.sort(() => Math.random() - 0.5).slice(0, limit);
}

// Render headlines (limit to 3)
function renderHeadlines(data) {
    const shuffledData = shuffleAndLimit(data, 6); // Limit to 3 headlines
    shuffledData.forEach(headline => {
        headlineCard.innerHTML += `
            <div class="headline">
                <img src="${headline.image.src}" alt="${headline.image.alt}" loading="lazy">
                <h6 class="subject">${headline.subject}</h6>
                <h3>${headline.title}</h3>
                <p>By ${headline.author}</p>
            </div>
        `;
    });
}

// Render topics (limit to 4)
function renderTopics(data) {
    const shuffledData = shuffleAndLimit(data, 8); // Limit to 4 topics
    shuffledData.forEach(topic => {
        topicsCard.innerHTML += `
            <div class="topics-card">
                <h3>${topic.title}</h3>
                <p>${topic.description}</p>
                <a href="#">${topic.cta}</a>                    
            </div>
        `;
    });
}

// Render events (limit to 4)
function renderEvents(data) {
    const shuffledData = shuffleAndLimit(data, 8); // Limit to 4 events
    shuffledData.forEach(event => {
        eventCard.innerHTML += `
            <div class="event-card">
                <h6>${event.category}</h6>
                <h3>${event.title}</h3>
                <p>${event.date}</p>
                <p>${event.time}</p>
                <p class="environment">${event.location}</p>
                <a href="#" alt="Learn more">${event.cta} <span class="arrow">&#8599</span></a>
            </div>
        `;
    });
}

// Load and render events
fetchDataAndRender("data/discover-page/events.json", renderEvents);

// Load and render topics
fetchDataAndRender("data/discover-page/topics.json", renderTopics);

// // Load and render headlines
fetchDataAndRender("data/discover-page/headlines.json", renderHeadlines);
