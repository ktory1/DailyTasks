const body = document.querySelector("body"),
    photoCred = document.querySelector("#photoCred");

const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${config.UNSPLASH_ACCESS_KEY}&query=landscape&orientation=landscape`;

let authorProfile = "";
// const IMG_COUNT = 8;
// const authorList = ["Ken Cheung",,,"Jeremy Thomas","Jose Mizrahi",]

// let currentBackground = 0;

function getBackgroundImage(){
    fetch(UNSPLASH_URL).then(function(response){
        return response.json();
    }).then(function(json){
        if (json.urls && json.urls.full && json.user){
            const imageUrl = json.urls.full;
            const imageAuthor = json.user;
            console.log(imageAuthor);
            authorProfile = imageAuthor.links.html;
            paintBackground(imageUrl);
            paintPhotoCred(imageAuthor);
        }else{
            getBackgroundImage();
        }
    })
    return;
}

function handleClickPhotoCred(event){
    window.open(authorProfile);
}


function paintPhotoCred(imageAuthor){
    photoCred.innerHTML = `photo by ${imageAuthor.name}`;
    photoCred.addEventListener("click", handleClickPhotoCred);
}

function paintBackground(imageUrl) {
    const image = new Image();
    image.src = imageUrl;
    image.classList.add("bgImage");
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),
     url('${image.src}')`;
}

// function genRandomNum(){
//     return Math.floor(Math.random() * IMG_COUNT);
// }

function init(){
    // const currentBackground = genRandomNum();
    getBackgroundImage();
}
init();