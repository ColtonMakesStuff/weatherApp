
const city = document.querySelector(".city");
const search = document.querySelector(".search");
const temp = document.querySelector(".temp");
const theWind = document.querySelector(".the-wind")
const tempLow = document.querySelector(".temp-low");
const tempHigh = document.querySelector(".temp-high");
const weatherIcon = document.querySelector(".weather-icon-container");
const weatherDescription = document.querySelector(".weather-description");

const fiveDayZero = document.querySelector('.zero-of-five')
const fiveDayOne = document.querySelector('.one-of-five')
const fiveDayTwo = document.querySelector('.two-of-five')
const fiveDayThree = document.querySelector('.three-of-five')
const fiveDayFour = document.querySelector('.four-of-five')

const fiveDayArr = [fiveDayZero, fiveDayOne, fiveDayTwo, fiveDayThree, fiveDayFour]

const fiveDayTempMin = document.querySelector('.five-low')
const fiveDayTempMax = document.querySelector('.five-high')
const fiveDayIcon = document.querySelector('.five-day-icon')
const fiveDayDate = document.querySelector('.five-day-date')
const currentTime = document.querySelector('.time-oclock')



var today = dayjs();
currentTime.innerHTML = today.format('h:mm a');

const apiKey = "3345d74a687b8041b547bb45348451f6";

var long = ''
var lati = ''
console.log(today.format('h:mm a'));
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
function fetchApi(cityInput) {
  let cityName = cityInput;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      handleData(data);
      handleIcon(data);
      fetchFiveDayApi();
    });
}



  function handleData(data){
   
    city.innerHTML = data.name
    temp.innerHTML = Math.round((Math.round (data.main.temp))*(9/5)+32) + "°F";
    tempHigh.innerHTML = Math.round((Math.round (data.main.temp_max))*(9/5)+32) + "°F";
    tempLow.innerHTML = Math.round((Math.round (data.main.temp_min))*(9/5)+32) + "°F";
     theWind.innerHTML = Math.round(data.wind.speed/1.609344) + " m/h";
    weatherDescription.innerHTML = data.weather[0].main
    long = data.coord.lon
    lati = data.coord.lat
  }



  function fetchFiveDayApi() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleFiveDayApiData(data)
      });
  }


  function handleFiveDayApiData(data){
    console.log(data.list)
    console.log(data.list[0].dt_txt)
    let index = 0
    for (let i=0; i < data.list.length; i++){
        
        if (data.list[i].dt_txt.substring(11, 13) == "12"){ 
            console.log("success")
            console.log(data.list[i].dt_txt)
            let cardNumber = fiveDayArr[index]
            handleMiniCard(cardNumber, data.list[i]);
            index  ++
        }
    }
    // handleMiniCard(fiveDayZero, data.list[1])
    // handleMiniCard(fiveDayOne, data)
    // handleMiniCard(fiveDayTwo, data)
    // handleMiniCard(fiveDayThree, data)
    // handleMiniCard(fiveDayFour, data)

  }

   function handleMiniCard(cardNumber, data){
    //  cardNumber.fiveDayTempMax.innerHTML = Math.round((Math.round (data.main.temp_max))*(9/5)+32) + "°F";
    //  cardNumber.fiveDayTempMax.innerHTML = Math.round((Math.round (data.main.temp_min))*(9/5)+32) + "°F";
    
    //  handleFiveDayIcon(data)
    console.log(cardNumber)
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


// function handleFiveDayIcon(data) {
//     if(data.weather[0].main == 'Clouds'){
//         cardNumber.fiveDayIcon.innerHTML = `<img src="./assets/images/icons/cloudy.svg" alt="">`;

//     } else if(data.weather[0].main == 'Rain'){
//         cardNumber.fiveDayIcon.innerHTML = `<img src="./assets/images/icons/rainy.svg" alt="">`;
            
//     } else if(data.weather[0].main == 'clear'){
//         cardNumber.fiveDayIcon.innerHTML = `<img src="./assets/images/icons/sunny.svg" alt="">`;
        
//     } else if(data.weather[0].main == 'snow'){
//         cardNumber.fiveDayIcon.innerHTML = `<img src="./assets/images/icons/snow.svg" alt="">`;
    
// }
   
// }


function handlePreviousSearch() {

}