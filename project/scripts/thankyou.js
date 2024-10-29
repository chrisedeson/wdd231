// Get the current URL and split it to extract query parameters
const currentUrl = window.location.href;
const queryString = currentUrl.split("?")[1];

// Ensure that query parameters exist before proceeding
if (queryString) {
    // Split the query string into key-value pairs
    const params = new URLSearchParams(queryString);

    // Function to safely extract and decode a parameter's value
    function getParameterValue(key) {
        return decodeURIComponent(params.get(key) || "");
    }

    // Populate the page with the submitted information
    document.getElementById("firstName").textContent = getParameterValue("firstName");
    document.getElementById("lastName").textContent = getParameterValue("lastName");
    document.getElementById("email").textContent = getParameterValue("email");
    document.getElementById("mobile").textContent = getParameterValue("mobile");
    document.getElementById("inquiry").textContent = getParameterValue("inquiry");
        
    // Display current date and time for the submission timestamp
    const timestampElement = document.getElementById("timestamp");
    const currentDate = new Date();
    timestampElement.textContent = currentDate.toLocaleString();
}