const nameForm = document.querySelector(".js-greetingsForm"),
    nameInput = nameForm.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing",
    GREETINGS = ["It's a beautiful night", "Good morning", "Good afternoon", "Good Evening"];

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmitName(event){
    event.preventDefault();
    console.dir(event);
    const currentValue = nameInput.value;
    saveName(currentValue);
    paintGreeting(currentValue);
    event.srcElement.elements[0].value = "";
}

function askForName() {
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit",handleSubmitName);
}

function paintGreeting(text){
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    const time = new Date().getHours();
    let greetingText = "";
    switch(true) {
        case time < 6:
            greetingText = GREETINGS[0];
            break;
        case time < 12:
            greetingText = GREETINGS[1];
            break;
        case time < 18:
            greetingText = GREETINGS[2];
            break;
        case time <= 23:
            greetingText = GREETINGS[3];
            break;
        default:
            greetingText = "Hello";
            break;
    }

    greeting.innerText = `${greetingText}, ${text}.`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function greetInit() {
    loadName();
    setInterval(loadName, 600000)
}

greetInit();