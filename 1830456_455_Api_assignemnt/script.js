let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
searchBtn.addEventListener("click", async () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  try {
    let countryData = await fetch(finalURL);
    countryData = await countryData.json();

    result.innerHTML = `
      <div class="details">
        <div class="firstdetail">
          <img src="${countryData[0].flags.svg}" class="flag-img">
          <h2>${countryData[0].name.common}</h2>
        </div>
        
        <div class="seconddetail">
          <div class="wrapper">
            <div class="data-wrapper">
              <h4>Capital:</h4>
              <span>${countryData[0].capital[0]}</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="data-wrapper">
              <h4>Continent:</h4>
              <span>${countryData[0].continents[0]}</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="data-wrapper">
              <h4>Population:</h4>
              <span>${countryData[0].population}</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="data-wrapper">
              <h4>Currency:</h4>
              <span>${countryData[0].currencies[Object.keys(countryData[0].currencies)].name} - ${Object.keys(countryData[0].currencies)[0]}</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="data-wrapper">
              <h4>Common Languages:</h4>
              <span>${Object.values(countryData[0].languages).toString().split(",").join(", ")}</span>
            </div>
          </div>
          <br><br><br><br>
          <div class ="more_detail">
          <button id="more-details-btn">More Details</button>
          <div id="weather-details"></div>
          </div>

        </div>
      </div>
    `;

    // Add click event listener for "More Details" button
    // ... (previous code)

// Add click event listener for "More Details" button
let moreDetailsBtn = document.getElementById("more-details-btn");
moreDetailsBtn.addEventListener("click", async () => {
  try {
    let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=f27b269d54e4fa1e72993364a80fa8bd&units=metric`);
    weatherData = await weatherData.json();
    let weatherDetails = document.getElementById("weather-details");

    // Example: Image URL representing the weather condition
    let iconCode = weatherData.weather[0].icon;

    let weatherImageUrl =`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherDetails.innerHTML = `<div class="rapper">
                                  <div class="apper">
                                    <h4>Temperature:</h4>
                                    <span>${weatherData.main.temp}°C</span>
                                  </div>
                                  
                                  <div class="apper">
                                    <h4>Humidity:</h4>
                                    <span>${weatherData.main.humidity}%</span>
                                  </div>

                                  <div class="apper">
                                    <h4>Quality:</h4>
                                    <span>${weatherData.weather[0].description}</span>
                                  </div>

                                  <div class="image-wrapper">
                                    <img src="${weatherImageUrl}" alt="Weather Icon">
                                  </div>
                                </div>`;
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
});

// ... (remaining code)

    
  } catch (error) {
    if (countryName.length == 0) {
      result.innerHTML = `<h3>The input field cannot be empty</h3>`;
    } else {
      result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
    }
  }
});