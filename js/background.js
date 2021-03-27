const body = document.querySelector("body"),
    photoCred = document.querySelector("#photoCred"),
    bgLock = document.querySelector("#locked"),
    bgUnlock = document.querySelector("#unlocked");

const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${config.UNSPLASH_ACCESS_KEY}&query=landscape&orientation=landscape`;

let authorProfile = "";
let isBgLocked = localStorage.getItem("isBgLocked");

function getBackgroundImage(){
    if(isBgLocked == "true"){
        paintBackground(localStorage.getItem("currentBackground"));
        paintPhotoCred(localStorage.getItem("currentAuthor"));
        authorProfile = localStorage.getItem("currentAuthorProfile");
    } else {
        fetch(UNSPLASH_URL).then(function(response){
            return response.json();
        }).then(function(json){
            if (json.urls && json.urls.full && json.user){
                const imageUrl = json.urls.full;
                const imageAuthor = json.user;
                authorProfile = imageAuthor.links.html;
                localStorage.setItem("currentBackground",imageUrl);
                localStorage.setItem("currentAuthor",imageAuthor.name);
                localStorage.setItem("currentAuthorProfile",authorProfile);
                currentAuthor = imageAuthor
                paintBackground(imageUrl);
                paintPhotoCred(imageAuthor.name);
            }else{
                getBackgroundImage();
            }
        })
    }
    return;
}

function handleClickPhotoCred(event){
    window.open(authorProfile);
}


function paintPhotoCred(imageAuthor){
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

function handleClickBgLock(event){
    if(isBgLocked === "true"){
        isBgLocked = false;
        localStorage.setItem("isBgLocked",isBgLocked);
        bgLock.classList.add("hidden");
        bgUnlock.classList.remove("hidden");
    }else {
        isBgLocked = true;
        localStorage.setItem("isBgLocked",isBgLocked);
        bgUnlock.classList.add("hidden");
        bgLock.classList.remove("hidden");
    }
}

function getBackgroundLock(){
if(isBgLocked === null){
        isBgLocked = false;
        localStorage.setItem("isBgLocked",false);
    } else if(isBgLocked === "true"){
        bgUnlock.classList.add("hidden");
        bgLock.classList.remove("hidden");
    }
    
    bgUnlock.addEventListener("click", handleClickBgLock);
    bgLock.addEventListener("click", handleClickBgLock);
}

function init(){
    getBackgroundLock();
    getBackgroundImage();   
}
init();