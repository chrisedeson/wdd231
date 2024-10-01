// Display current year and last modified date
const lastModifiedSpan = document.getElementById("lastModified");

document.getElementById("currentYear").textContent = new Date().getFullYear();
lastModifiedSpan.textContent += `Last Modification: ${document.lastModified}`;