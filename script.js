const API_KEY = "c8f2b09e7e8a58554d7392ad6605a065";

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleString("en-US", options);

  return formattedTime;
}

function getTimeAndDate(timestamp) {
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

  const options = { hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
  const time = date.toLocaleString("en-US", options);

  const dateFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const dateString = date.toLocaleString("en-US", dateFormatOptions);

  return {
    time: time,
    date: dateString,
  };
}

// Function to fetch weather data from OpenWeatherMap API
function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const feels_like = data.main.feels_like;
      const temp_min = data.main.temp_min;
      const temp_max = data.main.temp_max;
      const speed = data.wind.speed;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const dt = data.dt;
      let forSunrise = formatTime(sunrise);
      let forsunset = formatTime(sunset);
      const timeAndDate = getTimeAndDate(dt);
      let time11 = timeAndDate.time;
      let date11 = timeAndDate.date;

      // Display weather information
      document.getElementById("cityName").textContent = `Weather in ${cityName}:`;
      document.getElementById("temperature").textContent = `Temperature: ${temperature}°C`;
      document.getElementById("description").textContent = `Description: ${description}`;
      document.getElementById("feels_like").textContent = `Feels Like: ${feels_like}`;
      document.getElementById("temp_min").textContent = `Temp Min: ${temp_min}`;
      document.getElementById("temp_max").textContent = `Temp max: ${temp_max}`;
      document.getElementById("speed").textContent = `Wind Speed: ${speed}`;
      document.getElementById("sunrise").textContent = `Sunrise: ${forSunrise}`;
      document.getElementById("sunset").textContent = `Sunset: ${forsunset}`;
      document.getElementById("time").textContent = `Time: ${time11}`;
      document.getElementById("date").textContent = `Date: ${date11}`;

      // Show weather information container
      //  document.getElementById("weatherInfo").style.display = "block";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to fetch weather information. Please try again.");
    });
}

// Event listener for form submission
document.getElementById("weatherForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  getWeather(city);
});
const city = document.getElementById("city").value;
getWeather(city);
