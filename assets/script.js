
// lots of query selector's in arrears that pertain to certain sections of the HTML
const city = document.querySelector(".city");
const search = document.querySelector(".search");
const temp = document.querySelector(".temp");
const theWind = document.querySelector(".the-wind")
const tempLow = document.querySelector(".temp-low");
const tempHigh = document.querySelector(".temp-high");
const weatherIcon = document.querySelector(".weather-icon-container");
const weatherDescription = document.querySelector(".weather-description");
const humid = document.querySelector('#humid')

const fiveDayZero = document.querySelector('.zero-of-five')
const fiveDayOne = document.querySelector('.one-of-five')
const fiveDayTwo = document.querySelector('.two-of-five')
const fiveDayThree = document.querySelector('.three-of-five')
const fiveDayFour = document.querySelector('.four-of-five')





const dayZeroTempMin = document.querySelector('#five-low-zero')
const dayOneTempMin = document.querySelector('#five-low-one')
const dayTwoTempMin = document.querySelector('#five-low-two')
const dayThreeTempMin = document.querySelector('#five-low-three')
const dayFourTempMin = document.querySelector('#five-low-four')

const fiveDayMinArr = [dayZeroTempMin, dayOneTempMin, dayTwoTempMin, dayThreeTempMin, dayFourTempMin]


const dayZeroTempMax = document.querySelector('#five-high-zero')
const dayOneTempMax = document.querySelector('#five-high-one')
const dayTwoTempMax = document.querySelector('#five-high-two')
const dayThreeTempMax = document.querySelector('#five-high-three')
const dayFourTempMax = document.querySelector('#five-high-four')

const fiveDayMaxArr = [dayZeroTempMax, dayOneTempMax, dayTwoTempMax, dayThreeTempMax, dayFourTempMax]


const dayZeroIcon = document.querySelector('#day-zero-icon')
const dayOneIcon = document.querySelector('#day-one-icon')
const dayTwoIcon = document.querySelector('#day-two-icon')
const dayThreeIcon = document.querySelector('#day-three-icon')
const dayFourIcon = document.querySelector('#day-four-icon')

const fiveDayIconArr = [dayZeroIcon, dayOneIcon, dayTwoIcon, dayThreeIcon, dayFourIcon]

const dotwZero = document.querySelector('#dotw-zero')
const dotwOne = document.querySelector('#dotw-one')
const dotwTwo = document.querySelector('#dotw-two')
const dotwThree = document.querySelector('#dotw-three')
const dotwFour = document.querySelector('#dotw-four')

dotwArr = [dotwZero, dotwOne, dotwTwo, dotwThree, dotwFour]

const windZero = document.querySelector('#wind-zero')
const windOne = document.querySelector('#wind-one')
const windTwo = document.querySelector('#wind-two')
const windThree = document.querySelector('#wind-three')
const windFour = document.querySelector('#wind-four')

var fiveDayWindArr = [windZero, windOne, windTwo, windThree, windFour]

const humidZero = document.querySelector('#humid-zero')
const humidOne = document.querySelector('#humid-one')
const humidTwo = document.querySelector('#humid-two')
const humidThree = document.querySelector('#humid-three')
const humidFour = document.querySelector('#humid-four')

var fiveDayHumidArr = [humidZero, humidOne, humidTwo, humidThree, humidFour]

const fiveDaySection =document.querySelector('.five-day-container')

const fiveDayDate = document.querySelector('.five-day-date')
const currentTime = document.querySelector('#time')
const currentday = document.querySelector('#day')

const storedUserData = localStorage.getItem('userData')
let userDataArr = JSON.parse(storedUserData);


// populates the history section on page load
window.onload = function() {
    addToHistory()
};

// populates history section
  function addToHistory() {
    if (userDataArr === null) {
        userDataArr = [];
      }
   
        const previousBox = document.querySelector('.idk');
        previousBox.innerHTML= ""
        if (userDataArr.length > 20) {
            userDataArr.shift();
          }
      
  console.log(userDataArr)
  var index = 0
      for (let i = 0; i<userDataArr.length; i++) {
        const prevSearchDiv = document.createElement('div');
        prevSearchDiv.classList.add('prev-search');
        prevSearchDiv.setAttribute('id', 'click-me');
        const pElement = document.createElement('p');
        pElement.textContent = userDataArr[index];
        prevSearchDiv.appendChild(pElement);
        previousBox.appendChild(prevSearchDiv);
        index ++
      }
    }

// add event listener to history buttons
const clickMe = document.querySelector('#click-me')
    clickMe.addEventListener('click', function() {
        console.log(event.target.textContent);
        let citySearch = event.target.textContent
        fetchApiAgain(citySearch)
         
    });
  
// this section handles time js
var today = dayjs();
currentTime.innerHTML = today.format('h:mm a');
currentday.innerHTML = today.format('dddd') + " " + today.format('M/D/YYYY'); 

//set key
const apiKey = "3345d74a687b8041b547bb45348451f6";

//establish lon lat
var long = ''
var lati = ''

console.log(today.format('h:mm a'));

//reload page
function refresh(){
    location.reload();
}
 
// this makes it so that the enter key can run the function  
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      logCity()
    }
});
// this starts off the function and passes the city input into the API, why is it called log city, I don't know
function logCity(cityInput) {
    var cityInput = document.querySelector('#city-input').value;
    console.log(cityInput)
    fetchApi(cityInput) 
    document.querySelector(".search").reset();
}
// this is my error message
 function abducted() {
    city.innerHTML = "Please try again";    
    temp.innerHTML = "";
    tempHigh.innerHTML = "";
     tempLow.innerHTML = "kinda warm";
      theWind.innerHTML = "lightspeed"
     weatherDescription.innerHTML = "THIS PAGE WAS ABDUCTED BY ALIENS!"
     humid.innerHTML = "oddly moist"
     weatherIcon.innerHTML = `<img class="weather-icon" src="./assets/images/icons/abducted.svg" alt="">`;
    fiveDaySection.classList.add('hidden');
 }

// Make the API request using the constructed URL
function fetchApi(cityInput) {
  let cityName = cityInput;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        if (data.cod == '404' || data.cod == '400'){ 
    abducted()
    return;
    }
    fiveDaySection.classList.remove('hidden');
        if (data.cod !== '404' && data.cod !== '400'){
            if (userDataArr === null) {
                userDataArr = [];
              }
            let userData = cityInput
                userDataArr.push(userData); // Add the new object to the array
              localStorage.setItem('userData', JSON.stringify(userDataArr)); // Store the array in local storage
             console.log(userDataArr);
            }
      console.log(data);
      handleData(data);
      handleIcon(data);
      fetchFiveDayApi();
      addToHistory() 
    });
}

// this function is used when a item in the history is clicked on so that it doesn't create a new history item
function fetchApiAgain(cityInput) {
    let cityName = cityInput; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          if (data.cod == '404' || data.cod == '400'){ 
      abducted()
      return;
      }
      fiveDaySection.classList.remove('hidden');  
        console.log(data);
        handleData(data);
        handleIcon(data);
        fetchFiveDayApi();
        addToHistory() 
      });
     
  }

// this sends all the pertinent data from the API request into the page
  function handleData(data){
    city.innerHTML = data.name
    temp.innerHTML = Math.round((Math.round (data.main.temp))) + "°F";
    tempHigh.innerHTML = Math.round((Math.round (data.main.temp_max))) + "°F";
    tempLow.innerHTML = Math.round((Math.round (data.main.temp_min))) + "°F";
     theWind.innerHTML = Math.round(data.wind.speed/1.609344) + " m/h";
    weatherDescription.innerHTML = data.weather[0].main
    humid.innerHTML = data.main.humidity + "%"
    long = data.coord.lon
    lati = data.coord.lat
  }


// this uses the latitude and longitude variables that I Had created in the handle data function, and puts them into a forecast API
  function fetchFiveDayApi() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleFiveDayApiData(data)
      });
  }

// this handles all of the updates to the site for the five smaller cards, the five day forecast
  function handleFiveDayApiData(data){
    console.log(data.list)
    let index = 0
    
    for (let i=0; i < data.list.length; i++){
        if (data.list[i].dt_txt.substring(11, 13) == "00"){ 
            console.log(data.list[i].dt_txt)
           var timestamp = data.list[i].dt
           var date = dayjs.unix(timestamp);
           var dayOfWeek = date.format('dddd');
    console.log(dayOfWeek)
    dotwArr[index].innerHTML = dayOfWeek
                fiveDayMaxArr[index].innerHTML = Math.round(data.list[i].main.temp_max)+ "°F";
                console.log(index)
                fiveDayWindArr[index].innerHTML = "wind: " + Math.round(data.list[i].wind.speed/1.609344) + "mph";
                fiveDayHumidArr[index].innerHTML = "humidity: " + (data.list[i].main.humidity) + "%";
                var weather = data.list[i].weather[0].main

console.log(weather)
fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/sunny.svg" alt="">`;

            if (weather === 'Clouds'){
                    fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/cloudy.svg" alt="">`;
            } else if (weather === 'Rain'){
                    fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/rainy.svg" alt="">`;
            } else if (weather === 'clear'){
                    fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/sunny.svg" alt="">`;           
            } else if (weather === 'snow'){
                  fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/snow.svg" alt="">`;
            }
                index ++;
        }
    }
  }


// this sets the icon image for the main cards
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

