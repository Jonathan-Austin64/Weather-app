$(document).ready(function () {
  $("#submit").click(function () {
    return getWeather();
  });
});
// This is our API key
var APIKey = "d7308080fddfe6b510a1f87a3eb77fd6";
// Here we are building the URL we need to query the database
function getWeather() {
  var city = $("#city").val();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&appid=" + APIKey;
  // Ajax Call
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the queryURL
      console.log(queryURL);
      var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
      // Log the resulting object
      console.log(response);
      console.log($.ajax)
      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function (uvIndex) {
        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed + "MPH");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".uv").text("UV Index: " + uvIndex.value + "%");
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // add temp content to html
        $(".tempF").text("Temperature: " + tempF.toFixed(2) + "°F");
      });
    });
}