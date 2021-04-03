const clockContainer = document.querySelector(".js-clock"),
    clockTime = clockContainer.querySelector(".js-clock .clock"),
    clockDate = clockContainer.querySelector(".js-clock .date_text");

const daysOfTheWeek = [ "Sun", "Mon", "Tue", "Wed", "Thu",
"Fri", "Sat"];

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
// const timeOfDay = ["AM", "PM"];


function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const rawHours = date.getHours();
    const hours = rawHours>12 ? rawHours - 12 : rawHours;
    const seconds = date.getSeconds();
    
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const dow = daysOfTheWeek[date.getDay()];
    if (localStorage.getItem("clockType") === null || localStorage.getItem("clockType") === "twelvehrClock"){
        clockTime.innerText = `${hours < 10 ? `0${hours}` : hours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds}`;
    } else {
        clockTime.innerText = `${rawHours < 10 ? `0${rawHours}` : rawHours}:${
            minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds}`;
    }
    clockDate.innerText = `${dow}, ${month} ${day}, ${year}`;
}

function clockInit() {
    getTime();
    setInterval(getTime, 1000);
}

clockInit();