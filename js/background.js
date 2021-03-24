const body = document.querySelector("body");

const IMG_COUNT = 8;

function paintBackground(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)),
     url('${image.src}')`;
}
function genRandomNum(){
    return Math.ceil(Math.random() * IMG_COUNT);
}

function init(){
    const randomNumber = genRandomNum();
    paintBackground(randomNumber);
}
init();