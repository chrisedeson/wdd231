const dialogBox = document.querySelector("#modal");
const modalClose = document.querySelector("#modal button");
const modalTitle = document.querySelector("#modalTitle");
const modalBenefits = document.querySelector("#modalBenefits");
const form = document.querySelector(".membership-form");
const submitButton = document.getElementById("submitButton");

let membershipLevels = {}; // Initialize an empty object to hold the membership data

// Function to open modal and set its content
function openModal(level) {
    const membership = membershipLevels[level];

    if (membership) {
        modalTitle.textContent = membership.title;
        modalBenefits.innerHTML = ""; // Clear previous benefits
        membership.benefits.forEach(benefit => {
            const li = document.createElement("li");
            li.textContent = benefit;
            modalBenefits.appendChild(li);
        });

        // Add class based on membership level for styling
        dialogBox.className = `level-${level}`; // Set the class to np, gold, silver, or bronze
        dialogBox.showModal(); // Show the modal
    } else {
        console.error("Membership level not found:", level); // Error handling
    }
}

// Event Listener for closing the modal when user clicks elsewhere
dialogBox.addEventListener("click", event => {
    const dialogDimensions = dialogBox.getBoundingClientRect();
    if (
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom
    ) {
        dialogBox.close(); // Close the modal
    }
});

// Event listeners for each membership button
document.querySelector("#npCardButton").addEventListener("click", () => openModal("np"));
document.querySelector("#bronzeCardButton").addEventListener("click", () => openModal("bronze"));
document.querySelector("#silverCardButton").addEventListener("click", () => openModal("silver"));
document.querySelector("#goldCardButton").addEventListener("click", () => openModal("gold"));

// Event listener for closing the modal
modalClose.addEventListener("click", () => dialogBox.close());

// Fetch membership levels data from JSON file
async function getMembershipLevelsData() {
    try {
        const response = await fetch("../chamber/data/membership-levels.json");
        if (response.ok) {
            membershipLevels = await response.json(); // Store the data in the membershipLevels object
            console.log(membershipLevels); // Check the data in the console
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Call the function to load the membership levels data
getMembershipLevelsData();
