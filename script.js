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

// Date will be displayed at the top of the page
regularDate.text((now.format("dddd, MMMM Do YYYY")));

// On page load, update city array with data from local storage
function loadButtons(){
  if(allCities !== null){
    savedCities = allCities;
    userCity.val(allCities[0]);
    }
    
    // Create a button for each saved city
    for(i=0; i<savedCities.length; i++){
      var newCityButton = $("<button>")
      newCityButton.text(allCities[i]);
      newCityButton.addClass("classic-button btn btn-secondary btn-lg lcars-cosmic-bg");
      cityButtons.append(newCityButton);

      // When buttons are clicked, they call the citySearch function
      newCityButton.click(function(event){
        event.preventDefault;
        userCity.val($(this).text());
        citySearch();
      }) ;
    }
}

// On page load, information from the user's last saved city persists
loadButtons();
citySearch();

// Function to run API calls for both city buttons and searches
addCity.click(function(event){
  event.preventDefault();
  savedCities.push(userCity.val());

  // User's searched cities are saved to local storage
  localStorage.setItem("cities", JSON.stringify(savedCities)); 
})

// When user clicks "search" button, data is generated for their city
function citySearch() {
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
      $("#5-day-forecast").text("");

      console.log(response);
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
        var icon = $("<img>");
        icon.attr("src", "http://openweathermap.org/img/wn/"+response.daily[i].weather[0].icon+".png");
        icon.attr("alt", "Weather Icon");
        temp.text("Temperature: " + response.daily[i].temp.day + "°F");
        humidity.text("Humidity: " + response.daily[i].humidity + "%");
        $("#5-day-forecast").append(icon);
        $("#5-day-forecast").append(temp);
        $("#5-day-forecast").append(humidity);
      }

    })

  })
}

// When the "search" button is clicked, call the citySearch function
searchButton.click(function(event){
  event.preventDefault;
  citySearch();
})


