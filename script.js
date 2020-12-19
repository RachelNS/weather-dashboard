// Variables that grab HTML elements
var regularDate = $("#date-here");
// Extra, delete if you run out of time
var starDate = $("stardate");

// Other global variables
var now = moment();
var currentHour = now.format("HH");

// Date will be displayed at the top of the page
regularDate.text((now.format("dddd, MMMM Do YYYY")));