import { courses } from "./course-list-array.js"


const hamburgerBtn = document.querySelector(".hamburger-btn")
const navigationLinks = document.querySelector("ul")
const modalCloseBtn = document.querySelector(".modal-close")
const coursesDiv = document.querySelector(".courses")
const allCourseBtn = document.querySelector("#all")
const cseCourseBtn = document.querySelector("#cse")
const wddCourseBtn = document.querySelector("#wdd")
const amountCredits = document.querySelector('.credits-required')

const currentYear = new Date().getFullYear()
const lastModifiedDate = document.lastModified
const lastModifiedSpan = document.getElementById("lastModified")
lastModifiedSpan.textContent += ` Last Update: ${lastModifiedDate}`


document.getElementById("currentYear").textContent = currentYear

hamburgerBtn.addEventListener("click", (event) => {
    navigationLinks.style.display = "block"
    hamburgerBtn.style.display = "none"
    modalCloseBtn.style.display = "block"
})

modalCloseBtn.addEventListener("click", () => {
    modalCloseBtn.style.display = "none"
    navigationLinks.style.display = "none"
    hamburgerBtn.style.display = "block"
})

courses.forEach((course) => {
    coursesDiv.innerHTML += `<button>${course.subject} ${course.number}</button>`
    const newButton = coursesDiv.lastElementChild   // Get the last button (which is the one we just added)
    if (course.completed) {
        newButton.style.backgroundColor = "red"
    }

})

cseCourseBtn.addEventListener("click", () => {
    coursesDiv.innerHTML = ""
    const cseCoursesArray = courses.filter(cseCourse => cseCourse.subject === "CSE")
    cseCoursesArray.forEach(course => {
        coursesDiv.innerHTML += `<button>${course.subject} ${course.number}</button>`

    })

})

wddCourseBtn.addEventListener("click", () => {
    coursesDiv.innerHTML = ""
    const wddCourseArray = courses.filter(wddCourse => wddCourse.subject === "WDD")
    wddCourseArray.forEach(course => {
        coursesDiv.innerHTML += `<button>${course.subject} ${course.number}</button>`
    })
})

allCourseBtn.addEventListener("click", () => {
    coursesDiv.innerHTML = ""
    courses.forEach((course) => {
        coursesDiv.innerHTML += `<button>${course.subject} ${course.number}</button>`
        const newButton = coursesDiv.lastElementChild   // Get the last button (which is the one we just added)
        if (course.completed) {
            newButton.style.backgroundColor = "red"
        }
    
    })
    
})


const creditsNumber = courses.reduce((number, course) => {
    return number + course.credits
}, 0)

amountCredits.innerHTML = `Credits Required: ${creditsNumber}`