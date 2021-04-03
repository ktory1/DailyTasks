const body = document.querySelector("body"),
    photoCred = document.querySelector("#photoCred"),
    bgShuffle = document.querySelector('#shuffle'),
    bgDownload = document.querySelector("#download");

let authorProfile = "";
let isBgLocked = localStorage.getItem("isBgLocked");
let theme = getTheme();
const CURRENT_BG_LS = "currentBackground";
const CURRENT_AUTH_LS = "currentAuthor";
const CURRENT_AUTH_PROF_LS = "currentAuthorProfile";

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
    if (localStorage.getItem(CURRENT_BG_LS) != "" && localStorage.getItem(CURRENT_BG_LS) != null ) {
        paintBackground(localStorage.getItem(CURRENT_BG_LS));
        paintPhotoCred(localStorage.getItem(CURRENT_AUTH_LS));
        authorProfile = localStorage.getItem(CURRENT_AUTH_PROF_LS);
    } else {
        fetch(UNSPLASH_URL).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (json.urls && json.urls.full && json.user) {
                const imageUrl = json.urls.full;
                const imageAuthor = json.user;
                authorProfile = imageAuthor.links.html;
                localStorage.setItem(CURRENT_BG_LS, imageUrl);
                localStorage.setItem(CURRENT_AUTH_LS, imageAuthor.name);
                localStorage.setItem(CURRENT_AUTH_PROF_LS, authorProfile);

                console.log(json.links);
                currentAuthor = imageAuthor;
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
    localStorage.setItem(CURRENT_BG_LS, "");
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