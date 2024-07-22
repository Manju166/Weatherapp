const apiKey = '71d2e3d57cb2cc089201e5b2307af76a'; 

async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherInfoDiv = document.getElementById('weather-info');

    if (city === '') {
        weatherInfoDiv.innerHTML = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = 'City not found. Please enter a valid city name.';
            return;
        }
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const weatherInfo = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${weatherIcon}" class="weather-icon" alt="${data.weather[0].description}">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        weatherInfoDiv.innerHTML = weatherInfo;
    } catch (error) {
        weatherInfoDiv.innerHTML = 'Error fetching weather data. Please try again later.';
    }
}
