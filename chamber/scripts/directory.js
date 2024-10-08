import { getCompanyData } from "./dataFetcher.mjs";


const cards = document.querySelector('#cards');
const gridBtn = document.querySelector('.grid-btn');
const listBtn = document.querySelector('.list-btn');
const mediaQuery = window.matchMedia('(max-width: 38rem)');

// Define displayCompanies function
const displayCompanies = (data) => {
    data.forEach(company => {
        const card = document.createElement('section');
        const companyName = document.createElement('h3');
        const companyAddress = document.createElement('p');
        const companyPhone = document.createElement('p');
        const companyWebsite = document.createElement('a');
        const companyIcon = document.createElement('img');

        // Build, set relevant attributes
        companyIcon.setAttribute('src', company.icon);
        companyIcon.setAttribute('alt', company.description);
        companyIcon.setAttribute('loading', 'lazy');
        companyIcon.setAttribute('width', '340');
        companyIcon.setAttribute('height', '440');        
        companyName.textContent = company.name;
        companyAddress.textContent = company.address;
        companyPhone.innerHTML = `<span id="phoneNumber">${company.phone}</span>`;
        companyWebsite.href = company.website;
        companyWebsite.textContent = company.website; // Text for the link
        companyWebsite.target = '_blank';
        
        card.appendChild(companyName);
        card.appendChild(companyIcon);
        card.appendChild(companyAddress);
        card.appendChild(companyPhone);
        card.appendChild(companyWebsite);
        
        cards.appendChild(card);
    });
};

// Event listeners for grid and list views
gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    cards.classList.add('display-grid');
    cards.classList.remove('display-list');
});

listBtn.addEventListener('click', () => {
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    cards.classList.add('display-list');
    cards.classList.remove('display-grid');
});

// Function to handle media query changes
function handleMediaQueryChange(e) {
    if (e.matches) {
        cards.classList.remove('display-list');
        cards.classList.add('display-grid');
    }
}

// Check on initial load
handleMediaQueryChange(mediaQuery);
mediaQuery.addListener(handleMediaQueryChange);


// Fetch company data and display it
getCompanyData(displayCompanies); // Pass displayCompanies as a callback