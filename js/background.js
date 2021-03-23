const body = document.querySelector("body");

const IMG_COUNT = 8;

function paintBackground(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandomNum(){
    return Math.ceil(Math.random() * IMG_COUNT);
}

function init(){
    const randomNumber = genRandomNum();
    paintBackground(randomNumber);
}
init();