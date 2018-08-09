var timezone, humidity, pressure, temperature, windSpeed, weatherSummary, object;

function element(id) {
    return document.getElementById(id);
}

window.onload = function () {
	 timezone = element('timezone');
    humidity = element('current-humidity');
    pressure = element('current-pressure');
    temperature = element('current-temperature');
    windSpeed = element('current-wind-speed');
    weatherSummary = element('weather-summary');
}

function getWeather() {
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function (position) {
           var lat = position.coords.latitude,
               long = position.coords.longitude;
           showWeather(lat, long);
       })
    } 
    else {
        return alert('Your browser does not supported geolocation API');
    }
}

function showWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    displayWeather(object);

}
function displayWeather(object) {
	timezone.innerHTML = "Timezone: " + object.timezone;
	humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
	pressure.innerHTML = "Pressure: " + object.currently.pressure + "mb";
	temperature.innerHTML = "Temperature: " + convertToC(object.currently.temperature) + "C";
	windSpeed.innerHTML = "Wind speed: " + knotsToKilometres(object.currently.windSpeed) + "km/h";
	weatherSummary.innerHTML = "Weather Summary: " + object.currently.summary;
}
function convertToC(fahrenheit) {
	return Math.round(5/9 * (fahrenheit - 32));
}
function humidityPercentage(humidity) {
    return Math.round(humidity * 100);
}
function knotsToKilometres(knot) {
    return Math.round(knot * 1.852);
}
