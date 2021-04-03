
const weather = document.querySelector(".js-weather"),
    weatherImg = document.querySelector(".weather-img"),
    locationText = document.querySelector(".location"),
    weatherBox = document.querySelector(".weather");

const COORDS = 'coords';
const LOCATION_LS = "locationName";
const LOCATION_ID_LS = "locationId";
const GEO_ERROR_TEXT = "Unable to access location";
let METRIC_UNITS = true;
let currentWeatherId = null;
let currentWeatherText = "";

function toggleUnits(){
    METRIC_UNITS = !METRIC_UNITS;
}

function getLocationInfo(lat, lon){
    return fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${config.WEATHER_API_KEY}&q=${lat}%2C${lon}`
    ).then(function(response){
        return response.json();
    })
}

function getCurrentWeather(locationKey){
    return fetch(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${config.WEATHER_API_KEY}`
    ).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        currentWeatherId = json[0].WeatherIcon;
        currentWeatherText = json[0].WeatherText;
        paintWeatherImg();
        return METRIC_UNITS ? json[0].Temperature.Metric.Value : json[0].Temperature.Imperial.Value;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function paintWeatherImg() {
    weatherImg.src = `./img/w${currentWeatherId}.png`;
    weatherImg.title = currentWeatherText;
}

function paintWeather(lat, lon){
    let location = "";
    getLocationInfo(lat, lon).then(function(locationInfo){
        location = locationInfo.LocalizedName;
        localStorage.setItem(LOCATION_LS, location);
        localStorage.setItem(LOCATION_ID_LS, locationInfo.Key);
        return getCurrentWeather(locationInfo.Key);
    }).then(function (weatherInfo) {
        const unit = METRIC_UNITS ? "C" : "F";
        weather.innerText = `${weatherInfo}${String.fromCharCode(176)}${unit}`;
        locationText.innerText = `@ ${location}`;
        weatherBox.addEventListener("click", handleClickWeather)
    });
}

function handleClickWeather(event){
    const locationName = localStorage.getItem(LOCATION_LS);
    const locationId = localStorage.getItem(LOCATION_ID_LS);
    window.open(`https://www.accuweather.com/en/ca/${locationName}/v6r/current-weather/${locationId}`);
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    paintWeather(latitude, longitude);
}
function handleGeoError(){
    weather.innerText = GEO_ERROR_TEXT;
    console.log("Can't access geolocation");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        paintWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function weatherInit() {
    loadCoords();
    setInterval(loadCoords, 3600000)
}
weatherInit();