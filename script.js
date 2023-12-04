var timer = null;
window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    clearTimeout(timer);
    if (window.pageYOffset == 0) {
        header.classList.remove("fade-out");
        header.classList.add("fade-in");
    } else {
        header.classList.remove("fade-in");
        header.classList.add("fade-out");
        timer = setTimeout(function() {
            header.classList.remove("fade-out");
        }, 500);
    }
});