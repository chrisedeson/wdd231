import { temples, url } from "../data/temples.js"

// console.log(url)
// console.log(temples)

const showHere = document.querySelector("#showHere")
const mydialog = document.querySelector("#mydialog")
const mytitle = document.querySelector("#mydialog h2")
const myclose = document.querySelector("#mydialog button")
const myinfo = document.querySelector("#mydialog p")

myclose.addEventListener("click", () => mydialog.closest())

function displayItems(data) {
    // console.log(data)
    data.forEach(x => {
        // console.log(x)
        const photo = document.createElement('img')
        photo.src = `${url}${x.path}`
        photo.alt = x.name

        // Add an Event Listener to each division on the page
        photo.addEventListener("click", () => showStuff(x));
        

        showHere.appendChild(photo)
        
    });
}

displayItems(temples)


function showStuff(x) {
    mytitle.innerHTML = x.name
    mydialog.showModal()

    const infoDescription = document.createElement("p")
    infoDescription.innerHTML = `
        <p>Dedicated: ${x.dedicated} by ${x.person} as ${x.number}</p>
    `
    myinfo.appendChild(infoDescription)
    
}