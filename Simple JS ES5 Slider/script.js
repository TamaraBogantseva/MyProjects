var gallery = [
    "slide1",
    "slide2",
    "slide3",
    "slide4",
    "slide5",
    "slide6"
]
var nextButton = document.getElementById("nextBtn");
var previousButton = document.getElementById("previousBtn");
var mainPicture = document.getElementById("mainImg");
var mainGallery = document.getElementById("main_gallery");
var index = 0;
var currentImg = function (x) {
    mainPicture.src = "img/" + x + ".jpg"
}

function slideLeft() {
    index--;
    if (index < 0) {
        index = gallery.length - 1;
        currentImg(gallery[index]);
    } else {
        currentImg(gallery[index]);
    }
}

function slideRight() {
    index++;
    if (index == gallery.length) {
        index = 0;
        currentImg(gallery[index]);
    } else {
        currentImg(gallery[index]);
    }
}

nextButton.onclick = slideRight;
previousButton.onclick = slideLeft;
