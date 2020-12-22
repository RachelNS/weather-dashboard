// Variables that grab HTML elements
var regularDate = $("#date-here");

// Form Input
var userCity = $("#city-here");
var searchButton = $("#search");
var addCity = $("#add-city");
var cityButtons = $("#buttons-here");

// Current city stats
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currrentHumidity = $("#current-humidity");
var currentWind = $("#current-wind");
var currentUV = $("#current-uv");

// 5-day forecast stats
var forecastStats = $("#5-day-forecast");

// Other global variables
var now = moment();
var currentHour = now.format("HH");
var savedCities = [];
var allCities = JSON.parse(localStorage.getItem("cities"));

// On page load, update city array with data from local storage
function loadButtons(){
  if(allCities !== null){
    savedCities = allCities;
    }
    // Create a button for each saved city
    for(i=0; i<savedCities.length; i++){
      var newCityButton = $("<button>")
      newCityButton.text(allCities[i]);
      newCityButton.addClass("classic-button btn btn-secondary btn-lg lcars-cosmic-bg");
      cityButtons.append(newCityButton);
    }
}

loadButtons();


// Date will be displayed at the top of the page
regularDate.text((now.format("dddd, MMMM Do YYYY")));

// When the "add city" button is clicked, save city to local storage
addCity.click(function(event){
  event.preventDefault();
  savedCities.push(userCity.val());
  console.log(savedCities);

  // User's searched cities are saved to local storage
  localStorage.setItem("cities", JSON.stringify(savedCities)); 
})

// When user clicks "search" button, data is generated for their city
searchButton.click(function citySearch(event) {
  event.preventDefault();

  // Default API URL
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity.val() + "&units=imperial&appid=a1eb40a0560eed9793dc1df3b1598bc4"

  // Default API call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Latitude and longitude from default API
    var longitude = response.coord.lon;
    var latitude = response.coord.lat;

    // OneCall API URL using latitude and longitude from previous call
    var oneCallQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=a1eb40a0560eed9793dc1df3b1598bc4";

    // OneCall API call
    $.ajax({
      url: oneCallQuery,
      method: "GET"
    }).then(function getForecast(response) {
      console.log(response)
      // Current weather in user's city
      currentCity.text(userCity.val());
      currentTemp.text("Current Temperature: " + response.current.temp + "°F");
      currrentHumidity.text("Humidity: " + response.current.humidity + "%");
      currentWind.text("Wind Speed: " + response.current.wind_speed + "mph");
      currentUV.text("UV Index: " + response.current.uvi);

      // 5-day forecast in user's city
      for (i = 1; i < 6; i++) {
        // Creates new p tags to hold the city's 5-day forecast data
        var temp = $("<p>");
        var humidity = $("<p>");
        temp.text("Temperature: " + response.daily[i].temp.day + "°F");
        humidity.text("Humidity: " + response.daily[i].humidity + "%");
        $("#5-day-forecast").append(temp);
        $("#5-day-forecast").append(humidity);
      }

    })

  })
})






    // TODO: Empty array of user city names
    // TODO: When user clicks "add city" button, push that city name to the empty city name array and save the array to local storage
    // TODO: When the page loads, fetch the array from local storage and loop over it:
        // TODO: For each iteration, create a button with that city's text
        // TODO: Add an event listener to each button that calls the getForecast function for the selected city

