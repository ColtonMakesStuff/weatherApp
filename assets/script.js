
const city = document.querySelector(".city");
const search = document.querySelector(".search");
const temp = document.querySelector(".temp");
const theWind = document.querySelector(".the-wind")
const tempLow = document.querySelector(".temp-low");
const tempHigh = document.querySelector(".temp-high");
const weatherIcon = document.querySelector(".weather-icon-container");
const weatherDescription = document.querySelector(".weather-description");

function refresh(){
    location.reload();
}
// window.onload = function() {
//     let cityInput = "new york"
//     fetchApi(cityInput)
    
//   };
  
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      logCity()
    }
  });

function logCity() {
    var cityInput = document.querySelector('#city-input').value;
    console.log(cityInput)
 
  
    fetchApi(cityInput) 
 document.querySelector(".search").reset();

}



// Make the API request using the constructed URL
function fetchApi(cityInput){
    let cityName = cityInput;
const apiKey = "3345d74a687b8041b547bb45348451f6";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    handleData(data)
    handleIcon(data)
  });}

  function handleData(data){
    city.innerHTML = data.name
    temp.innerHTML = Math.round((Math. round (data.main.temp))*(9/5)+32) + "°F";
    tempHigh.innerHTML = Math.round((Math. round (data.main.temp_max))*(9/5)+32) + "°F";
    tempLow.innerHTML = Math.round((Math. round (data.main.temp_min))*(9/5)+32) + "°F";
     theWind.innerHTML = Math.round(data.wind.speed/1.609344) + " m/h";
    weatherDescription.innerHTML = data.weather[0].main
  }

  function handleIcon(data) {
    if(data.weather[0].main === 'Clouds'){
        weatherIcon.innerHTML = `<img class="weather-icon" src="./assets/images/icons/cloudy.svg" alt="">`;
    }
        else if(data.weather[0].main === 'Rain'){
            weatherIcon.innerHTML = `<img class="weather-icon" src="./assets/images/icons/rainy.svg" alt="">`;
            
    }
    else if(data.weather[0].main === 'Clear'){
        weatherIcon.innerHTML = `<img class="weather-icon" src="./assets/images/icons/sunny.svg" alt="">`;
        
    }
    else if(data.weather[0].main === 'Snow'){
        weatherIcon.innerHTML = `<img class="weather-icon" src="./assets/images/icons/snow.svg" alt="">`;
        
    }
}

function handlePreviousSearch() {

}