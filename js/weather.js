
const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
let METRIC_UNITS = true;

function toggleUnits(){
    METRIC_UNITS = !METRIC_UNITS;
}

function getLocationInfo(lat, lon){
    return fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${config.WEATHER_API_KEY}&q=${lat}%2C${lon}`
    ).then(function(response){
        return response.json();
    })
}

function getCurrentWeather(locationKey){
    return fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${config.WEATHER_API_KEY}`
    ).then(function(response) {
        return response.json();
    })
    .then(function(json) {
        return METRIC_UNITS ? json[0].Temperature.Metric.Value : json.Temperature.Imperial.Value;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function paintWeather(lat, lon){
    let location = "";
    getLocationInfo(lat, lon).then(function(locationInfo){
        location = locationInfo.LocalizedName;
        return getCurrentWeather(locationInfo.Key);
    }).then(function (weatherInfo) {
        weather.innerText = `${weatherInfo} @ ${location}`
    });
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
    weather.innerText = "Unable to access location";
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

function init() {
    loadCoords();
}
init();