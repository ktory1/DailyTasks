const settingsButton = document.querySelector("#settings-button"),
    settingsDropdown = document.querySelector("#settings-dropdown"),
    clockoption24 = document.querySelector(".twntyfrhr-choice"),
    clockoption12 = document.querySelector(".twelvehr-choice"),
    weatherImperial = document.querySelector(".imperial-choice"),
    weatherMetric = document.querySelector(".metric-choice"),
    editName = document.querySelector("#name-setting");

const UNIT_TYPE_LS = "unitType";
const CLOCK_TYPE_LS = "clockType";


function handleClickWeatherSetting(event) {
    if (event.path[1].className === "metric-choice") {
        weatherMetric.children[0].checked = true;
        weatherImperial.children[0].checked = false;
        localStorage.setItem(UNIT_TYPE_LS, "metric");
        METRIC_UNITS = true;
        weatherInit();
    }
    else {
        weatherMetric.children[0].checked = false;
        weatherImperial.children[0].checked = true;
        localStorage.setItem(UNIT_TYPE_LS, "imperial");
        METRIC_UNITS = false;
        weatherInit();
    }
}

function paintWeatherSettings() {
    if (localStorage.getItem(UNIT_TYPE_LS) === null || localStorage.getItem(UNIT_TYPE_LS) === "metric") {
        weatherMetric.children[0].checked = true;
        weatherImperial.children[0].checked = false;
        localStorage.setItem(UNIT_TYPE_LS, "metric");
        METRIC_UNITS = true;
    } else {
        weatherMetric.children[0].checked = false;
        weatherImperial.children[0].checked = true;
        localStorage.setItem(UNIT_TYPE_LS, "imperial");
        METRIC_UNITS = false;
    }
    weatherMetric.addEventListener("click", handleClickWeatherSetting);
    weatherImperial.addEventListener("click", handleClickWeatherSetting);
}

function handleClickClockSetting(event) {
    if (event.path[1].className === "twelvehr-choice") {
        clockoption12.children[0].checked = true;
        clockoption24.children[0].checked = false;
        localStorage.setItem(CLOCK_TYPE_LS, "twelvehrClock");
        clockInit();
    }
    else {
        clockoption12.children[0].checked = false;
        clockoption24.children[0].checked = true;
        localStorage.setItem(CLOCK_TYPE_LS, "twntyfrhrClock");
        clockInit();
    }
}

function paintClockSettings() {
    if (localStorage.getItem(CLOCK_TYPE_LS) === null || localStorage.getItem(CLOCK_TYPE_LS) === "twelvehrClock") {
        clockoption12.children[0].checked = true;
        clockoption24.children[0].checked = false;
        localStorage.setItem(CLOCK_TYPE_LS, "twelvehrClock");
    } else {
        clockoption12.children[0].checked = false;
        clockoption24.children[0].checked = true;
        localStorage.setItem(CLOCK_TYPE_LS, "twntyfrhrClock");
    }
    clockoption12.addEventListener("click", handleClickClockSetting);
    clockoption24.addEventListener("click", handleClickClockSetting);
}

function handleClickSettings(event) {
    settingsDropdown.classList.toggle("hidden");
    if (!settingsDropdown.classList.contains("hidden")){
        console.log("listener added");
        document.addEventListener("click", handleCloseSettingOnClick);
    } else {
        console.log("listener removed");
        document.removeEventListener("click",handleCloseSettingOnClick);
    }
}

function handleClickEditName(event){
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    greetInit();
}

function paintEditName(){
    editName.addEventListener("click", handleClickEditName);
}

function handleCloseSettingOnClick(event){
    const isClickInside = settingsDropdown.contains(event.target) || settingsButton.contains(event.target);
    
    if (!isClickInside && !settingsDropdown.classList.contains("hidden")){
        settingsDropdown.classList.add("hidden");
    }
}


function loadSettings() {
    settingsButton.addEventListener("click", handleClickSettings);
    paintClockSettings();
    paintWeatherSettings();
    paintEditName();
}


function init() {
    loadSettings()
}
init();