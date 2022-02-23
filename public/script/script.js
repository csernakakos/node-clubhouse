// Select each nav element, and if its pathname is the same as the current page's pathname, then add a class "selected" to the nav element
[...document.querySelectorAll(".menu li a")].forEach(function(currentElement, currentIndex){
    if(currentElement.pathname === window.location.pathname) {
        currentElement.classList.add("selected");
    }
});

const allInputs = [...document.querySelectorAll(".form input")]

allInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        
        if (input.value.length >= 3) {
            document.querySelector(".button").classList.remove("disabled");
        } else {
            document.querySelector(".button").classList.add("disabled");
        }
    })
});

// FETCH CALL
// let messages;
// const getMessages = async() => {
//     const res = await fetch("/api/v1/messages");
//     const data = await res.json();
//     return messages = data.data.messages;
// }

// getMessages();