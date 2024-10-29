const filePath = "./scripts/cars.json"; // JSON file path


async function fetchDataAndRender() {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const data = await response.json();
            renderCars(data);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render car cards
function renderCars(cars) {
    const cardWrapper = document.getElementById("cardWrapper");
    cardWrapper.innerHTML = '';  // Clear existing content

    cars.forEach(car => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${car.name}</h2>
            <p>${car.type}</p>
            <img src="${car.img}" alt="${car.name}" loading="lazy">
            <div class="car-details">
                <p><i class="fa-solid fa-gas-pump"></i>${car.fuel}</p>
                <p><i class="fa-solid fa-gear"></i>${car.transmission}</p>
                <p><i class="fa-solid fa-user-group"></i>${car.seats} Persons</p>
            </div>
            <div class="car-details-bottom">
                <h3>₦${car.price}</h3>
                <button>Buy Now</button>
            </div>
        `;
        card.addEventListener("click", () => openModal(car));
        cardWrapper.appendChild(card);
    });
}

// Modal functionality
function openModal(car) {
    document.getElementById("modalCarName").innerText = car.name;
    document.getElementById("modalCarType").innerText = car.type;
    document.getElementById("modalCarImage").src = car.img;
    document.getElementById("modalCarDescription").innerText = car.description;
    document.getElementById("modalFuel").innerText = car.fuel;
    document.getElementById("modalTransmission").innerText = car.transmission;
    document.getElementById("modalSeats").innerText = car.seats;
    document.getElementById("modalPrice").innerText = `₦${car.price}`;

    const modal = document.getElementById("carModal");
    modal.style.display = "flex";
}

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
    const modal = document.getElementById("carModal");
    modal.style.display = "none";
}); 

// Initialize
fetchDataAndRender();
