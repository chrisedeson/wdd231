document.addEventListener("DOMContentLoaded", () => {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message = '';

    if (lastVisit) {
        const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        const lastVisitDate = new Date(parseInt(lastVisit)).toLocaleString();  // Convert last visit timestamp to readable format
        
        if (daysBetween < 1) {
            message = `Back so soon! Awesome! Your last visit was on ${lastVisitDate}.`;
        } else if (daysBetween === 1) {
            message = `You last visited 1 day ago on ${lastVisitDate}.`;
        } else {
            message = `You last visited ${daysBetween} days ago on ${lastVisitDate}.`;
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





const myAPI = "AIzaSyBPBT5i7lGwT2aE6QgcCQnzlC7GUBZDgqs"; // Google Map API

function initMap() {
    const location = { lat: 6.579009606154385, lng: 3.3519936816750078 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });
    new google.maps.Marker({ position: location, map: map });
}

// Function to dynamically load the Google Maps API script with error handling
function loadGoogleMaps() {
    try {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${myAPI}&callback=initMap`;
        script.async = true;
        
        // Add an error event listener to handle script load failure
        script.onerror = function () {
            console.error("Google Maps API failed to load.");
            alert("Failed to load Google Maps. Please check your internet connection or API key.");
        };
        
        document.head.appendChild(script);
    } catch (error) {
        console.error("An error occurred while loading Google Maps:", error);
        alert("An unexpected error occurred. Please try again later.");
    }
}

// Call the function to load the Google Maps API
loadGoogleMaps();
