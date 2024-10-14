import { courses } from "./course-list-array.js"

const hamburgerBtn = document.querySelector(".hamburger-btn");
const navigationLinks = document.querySelector("ul");
const modalCloseBtn = document.querySelector(".modal-close");
const coursesDiv = document.querySelector(".courses");
const allCourseBtn = document.querySelector("#all");
const cseCourseBtn = document.querySelector("#cse");
const wddCourseBtn = document.querySelector("#wdd");
const amountCredits = document.querySelector('.credits-required');
const lastModifiedSpan = document.getElementById("lastModified");

const courseDetails = document.getElementById("course-details")

// Display current year and last modified date
document.getElementById("currentYear").textContent = new Date().getFullYear();
lastModifiedSpan.textContent += ` Last Update: ${document.lastModified}`;

// Navigation toggle function
function toggleNavigation(isOpen) {
    // Toggle open/close class for navigation links
    navigationLinks.classList.toggle("open", isOpen);

    // Toggle visibility of hamburger and modal close buttons
    hamburgerBtn.classList.toggle("hide", isOpen);
    modalCloseBtn.classList.toggle("show", isOpen);
}

hamburgerBtn.addEventListener("click", () => toggleNavigation(true));
modalCloseBtn.addEventListener("click", () => toggleNavigation(false));

// Function to render courses based on subject and calculate credits
function renderCourses(subject) {
    coursesDiv.innerHTML = "";
    
    // Filter courses by subject if provided
    const filteredCourses = subject ? courses.filter(course => course.subject === subject) : courses;
    
    // Render each filtered course as a button
    filteredCourses.forEach(course => {
        const newButton = document.createElement('button');
        newButton.textContent = `${course.subject} ${course.number}`;
        if (course.completed) newButton.style.backgroundColor = "#808E49";
        coursesDiv.appendChild(newButton);


        coursesDiv.addEventListener('click', () => {
            displayCourseDetails(course)
        });
    });

    // Calculate and display the total credits for filtered courses
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    amountCredits.innerHTML = `Credits Required: ${totalCredits}`;

    
    
}

// Initial render of all courses and total credits
renderCourses();


// Event listeners for course filters
allCourseBtn.addEventListener("click", () => renderCourses());
cseCourseBtn.addEventListener("click", () => renderCourses("CSE"));
wddCourseBtn.addEventListener("click", () => renderCourses("WDD"));


// Calculate and display total credits required
const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
amountCredits.innerHTML = `Credits Required: ${totalCredits}`;



// Function to set the active navigation link
function setActiveLink(activeLink) {
    document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
    activeLink.classList.add("active");
}

function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technogies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal()

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}


// Add event listeners for all navigation links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (event) => {
        if (link.getAttribute('href') === "#") event.preventDefault(); // Prevent default only for '#' links
        setActiveLink(link); // Set clicked link as active
    });
});