import { courses } from "./course-list-array.js"

const hamburgerBtn = document.querySelector(".hamburger-btn")
const navigationLinks = document.querySelector("ul")
const modalCloseBtn = document.querySelector(".modal-close")
const coursesDiv = document.querySelector(".courses")
const creditsElement = document.querySelector('.credits-required')


document.addEventListener("click", function(event) {
    if (event.target.dataset.open || event.target.dataset.close) {
        navigationBtns(event)
    }
    const subject = event.target.dataset.subject
    if (subject) {
        coursesDiv.innerHTML = ""
        const filteredCourses = subject === "ALL" ? courses : courses.filter(course => course.subject === subject);
        filteredCourses.forEach(course => {
            coursesDiv.innerHTML += `<button>${course.subject} ${course.number}</button>`
            const newButton = coursesDiv.lastElementChild
            if (course.completed) {
                newButton.style.backgroundColor = "red"
            }
        })

    }
         
})

function navigationBtns() {
    const isOpen = event.target.dataset.open
        navigationLinks.style.display = isOpen ? "block" : "none"
        hamburgerBtn.style.display = isOpen ? "none" : "block"
        modalCloseBtn.style.display = isOpen ? "block" : "none"
}

courses.forEach((course) => {
    coursesDiv.innerHTML += `<button>${course.subject} ${course.number}</button>`
    const newButton = coursesDiv.lastElementChild   // Get the last button (which is the one we just added)
    if (course.completed) {
        newButton.style.backgroundColor = "red"
    }
})

const totalCredits = courses.reduce((number, course) => {
    return number + course.credits
}, 0);
creditsElement.innerHTML = `Credits Required: ${totalCredits}`


document.getElementById("currentYear").textContent = new Date().getFullYear()
document.getElementById("lastModified").textContent += ` Last Update: ${document.lastModified}`