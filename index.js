const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".card");
const apiKey = "/*api key here*/";
const cityInput = document.querySelector(".cityInput");

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            await getWeatherData(city);
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city");
    }
})

async function getWeatherData(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    const data = await response.json();
    displayWeatherData(data);
}

function displayWeatherData(data){
    const {name: city,
           main: {temp, humidity},  
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const despDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    despDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273).toFixed(2)}°C`;
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    despDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    card.append(cityDisplay, tempDisplay, humidityDisplay, weatherEmoji, despDisplay);
}

function getWeatherEmoji(weatherId){
    //https://openweathermap.org/weather-conditions for weather codes
    const code = Math.floor(weatherId/100);
    switch(code){
        case 2:
            return "⛈️";
        case 3:
            return "☔";
        case 5:
            return "🌧️";
        case 6:
            return "☃️";
        case 7:
            return "🌫️";
        case 8:
            if(weatherId === 800){
                return "☀️";
            }
            return "☁️";
        default:
            return "🌤️";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.append(errorDisplay);
}

