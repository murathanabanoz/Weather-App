const apiKey = "9649fa9119d34b46318e0677bcd834bb";

function firstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("get-weather-btn");
  button.addEventListener("click", getWeather);
});

function getWeather() {
  const city = document.getElementById("city-input").value;
  const weatherInfoDiv = document.getElementById("weather-info");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const temperature = data.main.temp;
        const description = firstLetter(data.weather[0].description);
        const cityName = data.name;
        const icon = data.weather[0].icon; // örn: 01d, 02n vb.

        weatherInfoDiv.innerHTML = `
            <h3>${cityName}</h3>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <p>🌡️ Sıcaklık: ${temperature}°C</p>
            <p>🌥️ Hava Durumu: ${description}</p>
        `;
      } else {
        weatherInfoDiv.innerHTML = `<p>Şehir bulunamadı.</p>`;
      }
    })
    .catch((error) => {
      weatherInfoDiv.innerHTML = `<p>Veri alınamadı.</p>`;
      console.error("Error:", error);
    });
}
