const currentTemperture = document.getElementById("current-temp")
const weatherIcon = document.querySelector("#weather-icon")
const captionDesc = document.querySelector("figcaption")

const url = "https://api.openweathermap.org/data/2.5/weather?lat=65.55&lon=45.3&units=imperial&appid=2ef9dd2b8e82a5914c0fce140f9bed2a"

async function apiFetch() {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            displayResults(data)
        } else {
            throw Error(await response.text())
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch()

function displayResults(data) {
    currentTemperture.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}@2x.png`
    let desc = data.weather[0].description
    weatherIcon.setAttribute('src', iconsrc)
    weatherIcon.setAttribute('width', 200)
    captionDesc.textContent = `${desc}`
}