// Select each nav element, and if its pathname is the same as the current page's pathname, then add a class "selected" to the nav element
[...document.querySelectorAll(".menu li a")].forEach(function(currentElement, currentIndex){
    if(currentElement.pathname === window.location.pathname) {
        currentElement.classList.add("selected");
    }
});

const allInputs = [...document.querySelectorAll(".form input")]

allInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        console.log(input.value.length);
        
        if (input.value.length >= 3) {
            console.log("YO")
            document.querySelector(".button").classList.remove("disabled");
        } else {
            document.querySelector(".button").classList.add("disabled");
        }
    })
});

