const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url)
    const data = await response.json()
    // console.table(data.prophets)
    displayProphets(data.prophets)
}

getProphetData()

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        // Create elements to add to the div.cards element
        const card = document.createElement('section')
        const fullName = document.createElement('h2')
        const portrait = document.createElement('img')
        const birthDate = document.createElement('p')
        const birthPlace = document.createElement('p')

        
        // Build the image portrait by setting all the relevant attributes
        fullName.textContent = `${prophet.name} ${prophet.lastname}`
        portrait.setAttribute('src', prophet.imageurl)
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`)
        portrait.setAttribute('loading', 'lazy')
        portrait.setAttribute('width', '340')
        portrait.setAttribute('height', '440')
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`

         // Append the section(card) with the created elements
        card.appendChild(fullName)
        card.appendChild(birthDate)
        card.appendChild(birthPlace)
        card.appendChild(portrait)

        cards.appendChild(card)
    });

}