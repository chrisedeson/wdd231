import { getCompanyData } from "./dataFetcher.mjs";

// Select elements
const currentWeatherDiv = document.querySelector(".current-weather-details");
const weatherForecastDiv = document.querySelector(".weather-forecast-details");
const businessSectionDiv = document.querySelector(".business-section");
const callActionButtons = document.querySelector(".call-action-btns"); // Select the call-to-action buttons

// API configuration
const apiKey = "2ef9dd2b8e82a5914c0fce140f9bed2a";
const latitude = 6.53;
const longitude = 3.37;
const units = "metric";

// URLs for current weather and forecast
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
const weatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

// Fetch data function with callback
async function fetchApi(url, renderFunction) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            renderFunction(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

// Fetch current weather and forecast data
fetchApi(currentWeatherUrl, renderCurrentWeather);
fetchApi(weatherForecastUrl, data => renderWeatherForecast(getThreeDayForecast(data)));

// Render current weather details
function renderCurrentWeather(data) {
    const sunrise = getFormattedTime(data.sys.sunrise);
    const sunset = getFormattedTime(data.sys.sunset);
    
    currentWeatherDiv.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <div>
            <p class="main-temp"><strong>${Math.round(data.main.temp)}&deg;C</strong></p>
            <p class="weather-descr">${capitalizeFirstLetter(data.weather[0].description)}</p>
            <p>High: ${Math.round(data.main.temp_max)}&deg;C</p>
            <p>Low: ${Math.round(data.main.temp_min)}&deg;C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
        </div>
    `;
}

// Format time for sunrise and sunset
function getFormattedTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${hours}:${minutes} ${ampm}`;
}

// Capitalize weather description
function capitalizeFirstLetter(string) {
    return string.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Process and render three-day weather forecast
function renderWeatherForecast(forecastData) {
    weatherForecastDiv.innerHTML = `
        <p>Today: <strong>${forecastData[0].temperature}°C</strong></p>
        <p>${forecastData[1].dayName}: <strong>${forecastData[1].temperature}°C</strong></p>
        <p>${forecastData[2].dayName}: <strong>${forecastData[2].temperature}°C</strong></p>
    `;
}

// Extract the next three unique days from the forecast
function getThreeDayForecast(data) {
    const dailyTemperatures = [];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let lastRecordedDay = null;

    data.list.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dayIndex = forecastDate.getDay();

        // Check if this forecast is for a new day and add it if it's unique
        if (dayIndex !== lastRecordedDay) {
            dailyTemperatures.push({
                dayName: daysOfWeek[dayIndex],
                temperature: Math.round(forecast.main.temp) // Already in Celsius
            });
            lastRecordedDay = dayIndex; // Update to the current day's index
        }
    });

    return dailyTemperatures.slice(0, 3); // Return only the first three unique days
}

const displayCompanies = (data) => {
    // Clear the section before displaying new companies
    businessSectionDiv.innerHTML = '';

    data.forEach(company => {
        const tagLine = getMembershipTag(company.membership_level);
        const membershipClass = company.membership_level === 3 ? 'gold-member' : 
                                 company.membership_level === 2 ? 'silver-member' : '';

        businessSectionDiv.innerHTML += `
            <div class="card">
                <p class="company-name">${company.name}</p>
                <p class="membership-tag ${membershipClass}">${tagLine}</p> <!-- Apply class here -->
                <div class="card-information">
                    <img src="${company.icon}" alt="${company.description}">
                    <div class="business-contacts">
                        <p><strong>EMAIL: </strong>${company.email}</p>
                        <p><strong>PHONE: </strong>${company.phone}</p>
                        <p><strong>URL: </strong>
                            <a href="${company.website}" target="_blank" class=url-links>${company.website}</a>
                        </p>
                    </div>
                </div>
            </div>
        `;
    });
};

// Function to determine the membership tag based on membership level
const getMembershipTag = (membershipLevel) => {
    if (membershipLevel === 3) {
        return "⭐ Gold Member";
    } else if (membershipLevel === 2) {
        return "Silver Member";
    } else {
        return "Member";
    }
};

const getSpotlightCompanies = (data) => {
    // Filter for Gold (3) and Silver (2) members
    const eligibleCompanies = data.filter(company => 
        company.membership_level === 3 || company.membership_level === 2
    );

    // Shuffle the filtered companies array and select the first three
    const selectedCompanies = eligibleCompanies
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return selectedCompanies;
};

// Load companies data
getCompanyData((data) => {
    const spotlightCompanies = getSpotlightCompanies(data);
    displayCompanies(spotlightCompanies);
});

// Show call-to-action buttons after the video has fully loaded
const heroVideo = document.querySelector(".hero video");
heroVideo.addEventListener("loadeddata", () => {
    callActionButtons.style.display = "block"; // Show buttons after video has loaded
});
