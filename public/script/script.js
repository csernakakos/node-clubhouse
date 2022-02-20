// Select each nav element, and if its pathname is the same as the current page's pathname, then add a class "selected" to the nav element
[...document.querySelectorAll(".menu li a")].forEach(function(currentElement, currentIndex){
    if(currentElement.pathname === window.location.pathname) {
        currentElement.classList.add("selected");
    }
});

const akos = [...document.querySelectorAll(".form input")]

// akos.forEach(function(currentElement) {
//     let validInputs = 0;
//     currentElement.addEventListener("keyup", () => {
//         validInputs = Array.from(akos).filter( input => input.value !== "");
//     })
// // document.querySelector(".button").classList.toggle("disabled");
// })


