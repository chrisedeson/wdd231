const dataSource = '../chamber/data/members.json';
const cards = document.querySelector('#cards');
const gridBtn = document.querySelector('.grid-btn')
const listBtn = document.querySelector('.list-btn')
// const display = document.querySelector('.display')
const mediaQuery = window.matchMedia('(max-width: 38rem)');

gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active')
    listBtn.classList.remove('active')

    cards.classList.add('display-grid')
    cards.classList.remove('display-list')
    
})

listBtn.addEventListener('click', () => {
    listBtn.classList.add('active')
    gridBtn.classList.remove('active')

    cards.classList.add('display-list')
    cards.classList.remove('display-grid')
})

// Function to handle media query changes
function handleMediaQueryChange(e) {
    if (e.matches) {
        // If screen width is less than or equal to 38rem
        cards.classList.remove('display-list');
        cards.classList.add('display-grid');
    }
}

// Check on initial load
handleMediaQueryChange(mediaQuery);

// Listen for changes in screen size
mediaQuery.addListener(handleMediaQueryChange);
async function getCompanyData() {
    try {
        const response = await fetch(dataSource)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()
        // console.table(data)
        displayCompanies(data)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

getCompanyData()


const displayCompanies = (data) => {
    data.forEach(company => {
        // create elements to add to the div.cards element
        const card = document.createElement('section')
        const companyName = document.createElement('h3')
        const companyAddress = document.createElement('p')
        const companyPhone = document.createElement('p')
        const companyWebsite = document.createElement('a')
        const companyIcon = document.createElement('img')

        // Build, set relevant attributes
        companyIcon.setAttribute('src', company.icon)
        companyIcon.setAttribute('alt', company.description)
        companyIcon.setAttribute('loading', 'lazy')
        companyIcon.setAttribute('width', '340')
        companyIcon.setAttribute('height', '440')        
        companyName.textContent = company.name

        companyAddress.textContent = company.address
        companyPhone.innerHTML = `<span id="phoneNumber">${company.phone}</span>`
        companyWebsite.href = company.website
        companyWebsite.textContent = company.website; // Text for the link
        companyWebsite.target = '_blank';
        
        card.appendChild(companyName)
        card.appendChild(companyIcon)
        card.appendChild(companyAddress)
        card.appendChild(companyPhone)
        card.appendChild(companyWebsite)
        
        cards.appendChild(card)


    })
    // Log only the names
}

