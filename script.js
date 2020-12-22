// Variables that grab HTML elements
var regularDate = $("#date-here");

// Form Input
var userCity = $("#city-here");
var searchButton = $("#search");

// Current city stats
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currrentHumidity = $("#current-humidity");
var currentWind = $("#current-wind");
var currentUV = $("#current-uv");

// 5-day forecast stats
var day1Info = $("#day-1-info");
var day2Info = $("#day-2-info");
var day3Info = $("#day-3-info");
var day4Info = $("#day-4-info");
var day5Info = $("#day-5-info");

// Extra, delete if you run out of time
var starDate = $("stardate");

// Other global variables
var now = moment();
var currentHour = now.format("HH");

// Date will be displayed at the top of the page
regularDate.text((now.format("dddd, MMMM Do YYYY")));



// $.ajax({
//   url: oneCallQuery,
//   method: "GET"
// }).then(function(response){
//   console.log(response);
// })



// When user clicks "add city" button, data is generated for their city
searchButton.click(function(event){
  event.preventDefault();

  // Default API URL
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userCity.val() +"&units=imperial&appid=a1eb40a0560eed9793dc1df3b1598bc4"

  // Default API call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  // Latitude and longitude from default API
  var longitude = response.coord.lon;
  var latitude = response.coord.lat;

  // OneCall API URL using latitude and longitude from previous call
  var oneCallQuery = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid=a1eb40a0560eed9793dc1df3b1598bc4";

  // OneCall API call
  $.ajax({
    url: oneCallQuery,
    method: "GET"
  }).then(function(response){
    console.log(response)
  })
})
})

