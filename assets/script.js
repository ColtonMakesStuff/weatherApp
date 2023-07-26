
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

fiveDayWindArr = [windZero, windOne, windTwo, windThree, windFour]

const humidZero = document.querySelector('#humid-zero')
const humidOne = document.querySelector('#humid-one')
const humidTwo = document.querySelector('#humid-two')
const humidThree = document.querySelector('#humid-three')
const humidFour = document.querySelector('#humid-four')

fiveDayHumidArr = [humidZero, humidOne, humidTwo, humidThree, humidFour]


const fiveDayDate = document.querySelector('.five-day-date')
const currentTime = document.querySelector('#time')
const currentday = document.querySelector('#day')

const storedUserData = localStorage.getItem('userData')
let userDataArr = JSON.parse(storedUserData);

//~~~~~~~~~~~~~need to add search history as a button input~~~~~~~~~~~~~

window.onload = function() {
    addToHistory()
  };

  function addToHistory() {
    if (userDataArr === null) {
        userDataArr = [];
      }
    // Get the stored userData from localStorage
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
  
        const pElement = document.createElement('p');
        pElement.textContent = userDataArr[index];
  
        prevSearchDiv.appendChild(pElement);
  
        // Append prevSearchDiv to a parent element in the DOM
        
        previousBox.appendChild(prevSearchDiv);
        index ++
      }
    }
  

var today = dayjs();
currentTime.innerHTML = today.format('h:mm a');
currentday.innerHTML = today.format('dddd') + " " + today.format('M/D/YYYY'); 

const apiKey = "3345d74a687b8041b547bb45348451f6";

var long = ''
var lati = ''
console.log(today.format('h:mm a'));
function refresh(){
    location.reload();
}
 
  
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
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
   // if (data.cod == '404' || data.cod == '400'){ say that page was abjucted by aliens please try again }
    .then((data) => {
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


  function handleFiveDayApiData(data){
    console.log(data.list)
    let index = 0
    
    for (let i=0; i < data.list.length; i++){
        
        if (data.list[i].dt_txt.substring(11, 13) == "18"){ 
           
            console.log(data.list[i].dt_txt)
           
           var timestamp = data.list[i].dt
           var date = dayjs.unix(timestamp);
           var dayOfWeek = date.format('dddd');
    console.log(dayOfWeek)

    dotwArr[index].innerHTML = dayOfWeek

                fiveDayMaxArr[index].innerHTML = Math.round(data.list[i].main.temp_max)+ "°F/";
                console.log(index)
                fiveDayMinArr[index].innerHTML = Math.round(data.list[i].main.temp_min)+ "°F";
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


//  function handleFiveDayIcon(index, data) {
//      if(data.list[i].weather[0].main == 'Clouds'){
//          fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/cloudy.svg" alt="">`;

//      } else if(data.list[i].weather[0].main == 'Rain'){
//         fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/rainy.svg" alt="">`;
            
//      } else if(data.list[i].weather[0].main == 'clear'){
//         fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/sunny.svg" alt="">`;
        
//      } else if(data.list[i].weather[0].main == 'snow'){
//         fiveDayIconArr[index].innerHTML = `<img src="./assets/images/icons/snow.svg" alt="">`;
    
//  }
   
//  }


function handlePreviousSearch() {

}