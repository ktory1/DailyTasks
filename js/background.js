const body = document.querySelector("body"),
    photoCred = document.querySelector("#photoCred"),
    bgShuffle = document.querySelector('#shuffle');

let authorProfile = "";
let isBgLocked = localStorage.getItem("isBgLocked");
let theme = getTheme();

const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${config.UNSPLASH_ACCESS_KEY}&query=${theme}&orientation=landscape`;

function getTheme() {
    const time = new Date().getHours();
    switch (true) {
        case time < 6:
            return "night-sky";
        case time < 10:
            return "bright-morning";
        case time < 14:
            return "shiny-afternoon";
        case time < 18:
            return "fresh-scenery";
        case time <= 23:
            return "zen-nature";
        default:
            return "nature";
    }
}

function getBackgroundImage() {
    if (localStorage.getItem("currentBackground") != "") {
        paintBackground(localStorage.getItem("currentBackground"));
        paintPhotoCred(localStorage.getItem("currentAuthor"));
        authorProfile = localStorage.getItem("currentAuthorProfile");
    } else {
        fetch(UNSPLASH_URL).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (json.urls && json.urls.full && json.user) {
                const imageUrl = json.urls.full;
                const imageAuthor = json.user;
                authorProfile = imageAuthor.links.html;
                localStorage.setItem("currentBackground", imageUrl);
                localStorage.setItem("currentAuthor", imageAuthor.name);
                localStorage.setItem("currentAuthorProfile", authorProfile);
                currentAuthor = imageAuthor
                paintBackground(imageUrl);
                paintPhotoCred(imageAuthor.name);
            } else {
                getBackgroundImage();
            }
        })
    }
    return;
}

function handleClickPhotoCred(event) {
    window.open(authorProfile);
}


function paintPhotoCred(imageAuthor) {
    photoCred.innerHTML = `photo by ${imageAuthor}`;
    photoCred.addEventListener("click", handleClickPhotoCred);
}

function paintBackground(imageUrl) {
    const image = new Image();
    image.src = imageUrl;
    image.classList.add("bgImage");
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)),
     url('${image.src}')`;
}

function handleClickBgShuffle(event){
    localStorage.setItem("currentBackground", "");
    getBackgroundImage();
}

function getBackgroundShuffle(){
    bgShuffle.addEventListener("click", handleClickBgShuffle)
}

function init() {
    getBackgroundShuffle();
    getBackgroundImage();
}
init();